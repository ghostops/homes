import { observable, action } from 'mobx';
import { ApiClient } from '../../api';

type CreateHomeStatusType = 'off' | 'coords' | 'info' | 'success';

export interface IHSHomesStore {
    homes: IHome[] | null;
    selectedHome: IHome | null;
    createHomeStatus: CreateHomeStatusType;
    createdHome: Partial<IHome>;
    homesLoaded: boolean;
    errors: any[];
}

export const HSHomesStoreDefaults: IHSHomesStore = {
    selectedHome: null,
    homes: null,
    createHomeStatus: 'off',
    createdHome: {},
    homesLoaded: false,
    errors: [],
};

export class HSHomesStore {
    private apiClient: ApiClient = new ApiClient(
        process.env.REACT_APP_API_ROOT as string
    );

    constructor() {
        this.loadAllHomes();
    }

    private uploadableImages: Blob[] = [];

    private enrichedIds: number[] = [];

    @observable
    public homes: IHome[] | null = HSHomesStoreDefaults.homes;

    @observable
    public selectedHome: IHome | null = HSHomesStoreDefaults.selectedHome;

    @observable
    public createdHome: Partial<IHome> = HSHomesStoreDefaults.createdHome;

    @observable
    public createHomeStatus: CreateHomeStatusType = HSHomesStoreDefaults.createHomeStatus;

    @observable
    public homesLoaded: boolean = HSHomesStoreDefaults.homesLoaded;

    @observable
    public errors: any[] = HSHomesStoreDefaults.errors;

    @action async setSelectedHome(home: IHome | null) {
        this.selectedHome = home;

        if (home && !this.enrichedIds.includes(home.ID)) {
            const enrichedHome = await this.apiClient.getHome(home.ID);

            // A race condition could happen when waiting for the enriched home
            if (this.selectedHome && this.selectedHome.ID === enrichedHome.ID) {
                // Store the enriched value in our array of homes to cache it
                this.enrichedIds.push(enrichedHome.ID);
                this.selectedHome = enrichedHome;

                const index = (this.homes as IHome[]).findIndex((h) => enrichedHome.ID === h.ID);
                (this.homes as IHome[])[index] = enrichedHome;
            }
        }
    }

    @action
    addUploadableImage(img: Blob) {
        this.uploadableImages = this.uploadableImages.concat(img);
    }

    @action
    setCreateHomeStatus(status: CreateHomeStatusType) {
        this.createHomeStatus = status;
    }

    @action
    setCreatedHomeData(partialHome: Partial<IHome>) {
        this.createdHome = {
            ...this.createdHome,
            ...partialHome,
        };
    }

    @action
    async loadAllHomes() {
        this.errors = [];

        try {
            const homes = await this.apiClient.getAllHomes();

            this.homes = homes;

            this.homesLoaded = true;
        } catch (err) {
            console.error(err);

            this.errors.push(err);

            this.homes = [];
        }
    }

    @action
    async createHome(home: Partial<IHome>): Promise<IHome> {
        const newHome = await this.apiClient.createHome({
            lat: home.Lat,
            lng: home.Lng,
            name: home.Name,
            movedIn: home.MovedIn,
            movedOut: home.MovedOut,
        });

        if (this.homes) {
            this.homes = this.homes.concat(newHome);
        }

        return newHome;
    }

    @action
    async uploadSelectedImages(homeId: number): Promise<void> {
        const errors = [];
        const paths = [];

        for (const img of this.uploadableImages) {
            try {
                const path = await this.apiClient.uploadImage(homeId, img);
                paths.push(path);
            } catch (err) {
                errors.push(err);
            }
        }

        if (errors.length) {
            console.error(errors);
        }

        if (!this.homes) return;

        const index = this.homes.findIndex((h) => h.ID === homeId);
        this.homes[index] = {
            ...this.homes[index],
            Images: paths,
        };

        this.uploadableImages = [];
    }

    @action
    async deleteHome(homeId: number): Promise<void> {
        if (!this.homes) return;

        const home = this.homes.find((h) => h.ID === homeId);

        if (!home) return;

        const deleteHome = window.confirm(`Delete ${home.Name} forever?`);

        if (deleteHome) {
            this.setSelectedHome(null);
            this.homes = this.homes.filter((h) => h.ID !== home.ID);
            await this.apiClient.deleteHome(homeId);
        }
    }
}

import { observable, action } from 'mobx';
import { ApiClient } from '../../api';

type CreateHomeStatusType = 'off' | 'coords' | 'info' | 'success';

export interface IHSHomesStore {
    homes: IHome[];
    selectedHome: IHome | null;
    createHomeStatus: CreateHomeStatusType;
    createdHome: Partial<IHome>;
    homesLoaded: boolean;
}

export const HSHomesStoreDefaults: IHSHomesStore = {
    selectedHome: null,
    homes: [],
    createHomeStatus: 'off',
    createdHome: {},
    homesLoaded: false,
};

export class HSHomesStore {
    private apiClient: ApiClient = new ApiClient('http://localhost:8000');

    constructor() {
        this.loadAllHomes();
    }

    private uploadableImages: Blob[] = [];

    @observable
    public homes: IHome[] = HSHomesStoreDefaults.homes;

    @observable
    public selectedHome: IHome | null = HSHomesStoreDefaults.selectedHome;

    @observable
    public createdHome: Partial<IHome> = HSHomesStoreDefaults.createdHome;

    @observable
    public createHomeStatus: CreateHomeStatusType = HSHomesStoreDefaults.createHomeStatus;

    @observable
    public homesLoaded: boolean = HSHomesStoreDefaults.homesLoaded;

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
        try {
            const homes = await this.apiClient.getAllHomes();

            this.homes = homes;

            this.homesLoaded = true;
        } catch (err) {
            console.error(err);

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

        this.homes = this.homes.concat(newHome);

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

        const index = this.homes.findIndex((h) => h.ID === homeId);
        this.homes[index] = {
            ...this.homes[index],
            Images: paths,
        };

        this.uploadableImages = [];
    }

    @action
    async deleteHome(homeId: number): Promise<void> {
        const homeIndex = this.homes.findIndex((h) => h.ID === homeId);
        const home = this.homes[homeIndex];

        const deleteHome = window.confirm(`Delete ${home.Name} forever?`);

        if (deleteHome) {
            await this.apiClient.deleteHome(homeId);
            this.selectedHome = null;
            this.homes.splice(homeIndex, 1);
        }
    }
}

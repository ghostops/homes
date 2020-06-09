import { observable, action } from 'mobx';
import { ApiClient } from '../../api';

type CreateHomeStatusType = 'off' | 'coords' | 'info' | 'success';

export interface IHSHomesStore {
    homes: IHome[];
    createHomeStatus: CreateHomeStatusType;
}

export const HSHomesStoreDefaults: IHSHomesStore = {
    homes: [],
    createHomeStatus: 'off',
};

export class HSHomesStore {
    private apiClient: ApiClient = new ApiClient('http://localhost:8000');

    constructor() {
        this.loadAllHomes();
    }

    @observable
    public homes: IHome[] = HSHomesStoreDefaults.homes;

    @observable
    public createHomeStatus: CreateHomeStatusType = HSHomesStoreDefaults.createHomeStatus;

    @action
    setCreateHomeStatus(status: CreateHomeStatusType) {
        this.createHomeStatus = status;
    }

    @action
    async loadAllHomes() {
        try {
            const homes = await this.apiClient.getAllHomes();

            this.homes = homes;
        } catch (err) {
            console.error(err);

            this.homes = [];
        }
    }

    @action
    async createHome(home: Partial<IHome>) {
        try {
            const newHome = await this.apiClient.createHome({
                lat: home.Lat,
                lng: home.Lng,
                name: home.Name,
            });

            this.homes = this.homes.concat(newHome);
        } catch (err) {
            console.error(err);
        }
    }
}

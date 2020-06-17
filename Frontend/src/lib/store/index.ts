import { HSHomesStore } from './homes';
import { HSMapStore } from './map';
import { HSAuthStore } from './auth';
import { ApiClient } from '../api';

const API = new ApiClient(
    process.env.REACT_APP_API_ROOT as string,
);

export class RootStore {
    public homesStore = new HSHomesStore(API);
    public authStore = new HSAuthStore(API);
    public mapStore = new HSMapStore();
};

export const rootStore = new RootStore();

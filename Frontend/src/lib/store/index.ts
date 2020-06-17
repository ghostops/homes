import { HSHomesStore } from './homes';
import { HSMapStore } from './map';

export class RootStore {
    public homesStore = new HSHomesStore();
    public mapStore = new HSMapStore();
};

export const rootStore = new RootStore();

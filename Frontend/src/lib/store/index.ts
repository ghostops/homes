import { HSHomesStore } from './homes';
import { HSMapStore } from './map';

class RootStore {
    public homesStore = new HSHomesStore();
    public mapStore = new HSMapStore();
};

export const rootStore = new RootStore();

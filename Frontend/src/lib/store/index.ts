import { HSHomesStore } from './homes';

class RootStore {
    public homesStore = new HSHomesStore();
};

export const rootStore = new RootStore();

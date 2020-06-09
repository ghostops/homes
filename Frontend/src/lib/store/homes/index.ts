import { observable, action } from 'mobx';

export interface IHSHomesStore {
    completed: boolean;
}

export const HSHomesStoreDefaults: IHSHomesStore = {
    completed: false,
};

export class HSHomesStore {
	@observable
    public completed: boolean = HSHomesStoreDefaults.completed;

    @action
    resetToDefault() {
        this.completed = HSHomesStoreDefaults.completed;
    }
}

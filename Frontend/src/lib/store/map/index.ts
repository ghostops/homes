import { observable, action } from 'mobx';

export interface IHSMapStore {
    clickedLngLat: mapboxgl.LngLat | null;
}

export const HSMapStoreDefaults: IHSMapStore = {
    clickedLngLat: null,
};

export class HSMapStore {
    @observable
    public clickedLngLat: mapboxgl.LngLat | null = HSMapStoreDefaults.clickedLngLat;

    @action
    async setMapClickedLngLat(lngLat: mapboxgl.LngLat | null) {
        this.clickedLngLat = lngLat;
    }
}

import * as React from 'react';
import { MapboxGlMap, IMarker } from './mapbox';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSMapStore } from '../../../lib/store/map';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('mapStore')
@inject('homesStore')
@observer
export class HSMap extends React.PureComponent<Props> {
    markers = (): IMarker[] => {
        if (!this.props.homesStore) {
            return [];
        }

        let markers: IMarker[] = this.props.homesStore.homes.map((home) => {
            return {
                uid: home.ID,
                lat: home.Lat,
                lng: home.Lng,
                className: (
                    this.props.homesStore?.selectedHome?.ID === home.ID
                    ? 'marker selected'
                    : 'marker'
                ),
            };
        });

        if (this.props.mapStore?.clickedLngLat) {
            const { lng, lat } = this.props.mapStore.clickedLngLat;
            markers = markers.concat({ lat, lng, className: 'marker dropped' });
        }

        return markers;
    }

    onMapClick = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        if (this.props.homesStore?.createHomeStatus !== 'coords') return;

        this.props.mapStore?.setMapClickedLngLat(event.lngLat);
    }

    onMarkerClick = (marker: IMarker) => {
        if (!marker.uid) return;

        const clickedHome = this.props.homesStore?.homes.find((h) => h.ID === marker.uid);

        if (clickedHome && this.props.homesStore) {
            this.props.homesStore.selectedHome = clickedHome;
        }
    }

    render() {
        return (
            <MapboxGlMap
                initialState={{
                    lng: 17.866067,
                    lat: 59.416074,
                    zoom: 14,
                }}
                markers={this.markers()}
                onMapClick={this.onMapClick}
                onMarkerClick={this.onMarkerClick}
            />
        );
    }
}

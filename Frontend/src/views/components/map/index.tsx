import * as React from 'react';
import { MapboxGlMap, IMarker } from './mapbox';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSMapStore } from '../../../lib/store/map';
import { MapMarkerSVG } from '../svg/mapMarker';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('mapStore')
@inject('homesStore')
@observer
export class HSMap extends React.PureComponent<Props> {
    map: MapboxGlMap | null = null;

    markers = (): IMarker[] => {
        if (!this.props.homesStore || !this.props.homesStore.homes) {
            return [];
        }

        let markers: IMarker[] = this.props.homesStore.homes.map((home) => {
            const selected = this.props.homesStore?.selectedHome?.ID === home.ID;
            return {
                uid: home.ID,
                lat: home.Lat,
                lng: home.Lng,
                label: `
                    ${MapMarkerSVG({ height: 60, width: 50, fill: selected ? '#55E6C1' : 'white' })}
                    <p>${home.Name}</p>
                `,
                className: (
                    selected
                    ? 'marker selected'
                    : 'marker'
                ),
            };
        });

        if (this.props.mapStore?.clickedLngLat) {
            const { lng, lat } = this.props.mapStore.clickedLngLat;
            markers = markers.concat({
                lat,
                lng,
                className: 'marker dropped',
                label: MapMarkerSVG({ height: 60, width: 50, fill: 'white' })
            });
        }

        return markers;
    }

    onMapClick = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        if (this.props.homesStore?.createHomeStatus !== 'coords') return;

        this.props.mapStore?.setMapClickedLngLat(event.lngLat);
    }

    onMarkerClick = (marker: IMarker) => {
        if (!marker.uid || this.props.homesStore?.createHomeStatus === 'coords') return;

        const clickedHome = (this.props.homesStore?.homes as IHome[]).find((h) => h.ID === marker.uid);

        if (clickedHome && this.props.homesStore) {
            this.props.homesStore.setSelectedHome(clickedHome);
        }
    }

    bindMapRef = (map: MapboxGlMap) => {
        if (!map) return;
        this.map = map;
        this.props.mapStore?.bindMapRef(map.map);
    }

    render() {
        if (!this.props.homesStore?.homesLoaded) {
            return null;
        }

        return (
            <MapboxGlMap
                ref={this.bindMapRef}
                initialState={{
                }}
                markers={this.markers()}
                onMapClick={this.onMapClick}
                onMarkerClick={this.onMarkerClick}
                fitToInitialMarkers
            />
        );
    }
}

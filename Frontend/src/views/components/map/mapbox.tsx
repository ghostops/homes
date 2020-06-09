import * as React from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN } from './token';
import ResizeObserver from 'resize-observer-polyfill';
import _ from 'lodash';

interface Props {
    initialState?: Partial<State>;
    markers?: IMarker[];
    onMapMove?: (state: State) => void;
    onMapClick?: (event: mapboxgl.MapMouseEvent & mapboxgl.EventData, state: State) => void;
}

export interface IMarker {
    lat: number;
    lng: number;
    className?: string;
}

interface State {
    lng: number;
    lat: number;
    zoom: number;
    markers: mapboxgl.Marker[];
}

mapboxgl.accessToken = MAPBOX_TOKEN;

const createResizeHandler = (callback: () => void): ResizeObserverCallback => {
    let count = 0;

    return (e) => {
        const container = e[0];

        count += 1;

        if (!container || count === 0) return;

        callback();
    };
}

export class MapboxGlMap extends React.PureComponent<Props, State> {
    resizeObserver: ResizeObserver | null = null;

    map: mapboxgl.Map = null as any;

    mapContainer: HTMLDivElement | null = null;

    state: State = _.defaults(this.props.initialState, {
        lng: 0,
        lat: 0,
        zoom: 10,
        markers: [],
    } as State);

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer as HTMLDivElement,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        this.map.on('move', () => {
            this.setState({
                lng: this.map.getCenter().lng,
                lat: this.map.getCenter().lat,
                zoom: this.map.getZoom(),
            });

            if (this.props.onMapMove) {
                this.props.onMapMove(this.state);
            }
        });

        this.map.on('click', (event) => {
            if (this.props.onMapClick) {
                this.props.onMapClick(event, this.state);
            }
        });

        this.createMarkers();

        this.resizeObserver = new ResizeObserver(
            createResizeHandler(() => this.map.resize()),
        );

        this.resizeObserver.observe(this.mapContainer as Element);
    }

    componentDidUpdate(prevProps: Props) {
        if (
            JSON.stringify(prevProps.markers) !==
            JSON.stringify(this.props.markers)
        ) {
            this.createMarkers();
        }
    }

    componentWillUnmount() {
        this.resizeObserver?.unobserve(this.mapContainer as Element);
    }
    createMarkers = () => {
        if (!this.props.markers || !this.map) return;

        // Remove all previous markers
        this.state.markers.forEach((marker) => {
            marker.remove();
        });

        const markers = this.props.markers.map((marker) => {
            const el = document.createElement('div');
            el.className = marker.className || 'marker';

            // make a marker for each feature and add to the map
            const mapboxMarker = new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .addTo(this.map);

            return mapboxMarker;
        });

        this.setState({ markers });
    }

    render() {
        return (
            <div
                ref={(el) => this.mapContainer = el}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
        );
    }
}

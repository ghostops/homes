import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSMapStore } from '../../../lib/store/map';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('homesStore')
@inject('mapStore')
@observer
export class HSSidebar extends React.PureComponent<Props> {
    createHome = async () => {
        if (!this.props.mapStore?.clickedLngLat) {
            return;
        }

        const { lat, lng } = this.props.mapStore?.clickedLngLat;

        await this.props.homesStore?.createHome({
            Name: 'swag',
            Lat: lat,
            Lng: lng,
        });

        this.props.mapStore.setMapClickedLngLat(null);
    }

    startCreateHome = () => {
        this.props.homesStore?.setCreateHomeStatus('coords');
    }

    render() {
        return (
            <div>
                Sidebar

                <button onClick={this.startCreateHome}>
                    Add marker
                </button>
            </div>
        );
    }
}

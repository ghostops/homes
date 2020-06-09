import * as React from 'react';
import { MapboxGlMap } from './mapbox';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';

interface Props {
    homesStore?: HSHomesStore;
}

@inject('homesStore')
@observer
export class HSMap extends React.PureComponent<Props> {
    render() {
        return (
            <MapboxGlMap
                initialState={{
                    lng: 17.866067,
                    lat: 59.416074,
                    zoom: 14,
                }}
            />
        );
    }
}

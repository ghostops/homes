import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { HSMap } from '../../components/map';
import { HSSidebar } from '../../components/sidebar';
import { HSMapStore } from '../../../lib/store/map';
import { HSHomesStore } from '../../../lib/store/homes';
import { inject, observer } from 'mobx-react';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('homesStore')
@inject('mapStore')
@observer
export class HSHome extends React.PureComponent<Props> {
    selectingHomeCoords = (): boolean => {
        return (
            !!this.props.homesStore?.createHomeStatus &&
            this.props.homesStore?.createHomeStatus === 'coords'
        );
    }

    render() {
        return (
            <Grid padded>
                <Grid.Column width={this.selectingHomeCoords() ? 16 : 10}>
                    <HSMap />
                </Grid.Column>

                {
                    !this.selectingHomeCoords() &&
                    <Grid.Column width={6}>
                        <HSSidebar />
                    </Grid.Column>
                }
            </Grid>
        );
    }
}

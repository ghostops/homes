import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { HSMap } from '../../components/map';
import { HSSidebar } from '../../components/sidebar';
import { HSMapStore } from '../../../lib/store/map';
import { HSHomesStore } from '../../../lib/store/homes';
import { inject, observer } from 'mobx-react';
import { HSOverlay } from '../../components/overlay';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('homesStore')
@inject('mapStore')
@observer
export class HSHome extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.homesStore?.loadAllHomes();
    }

    selectingHomeCoords = (): boolean => {
        return (
            !!this.props.homesStore?.createHomeStatus &&
            this.props.homesStore?.createHomeStatus === 'coords'
        );
    }

    render() {
        return (
            <>
                <Grid padded>
                    <Grid.Column width={this.selectingHomeCoords() ? 16 : 10}>
                        <HSMap />
                    </Grid.Column>

                    {
                        !this.selectingHomeCoords() &&
                        <Grid.Column
                            width={6}
                            style={{
                                overflowY: 'auto',
                                height: '100%',
                            }}
                        >
                            <HSSidebar />
                        </Grid.Column>
                    }
                </Grid>

                <HSOverlay />
            </>
        );
    }
}

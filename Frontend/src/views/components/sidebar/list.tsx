import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HSMapStore } from '../../../lib/store/map';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSHomeList } from '../home/list';
import { Message } from 'semantic-ui-react';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('homesStore')
@inject('mapStore')
@observer
export class HSSidebarHomeList extends React.PureComponent<Props> {
    render() {
        return (
            <div style={{
                paddingBottom: 15,
            }}>
                <h1>
                    Your Homes
                </h1>

                {
                    this.props.homesStore &&
                    <HSHomeList
                        homes={this.props.homesStore.homes}
                        onHomeClick={(home) => {
                            if (this.props.homesStore) {
                                this.props.homesStore.selectedHome = home;
                            }

                            this.props.mapStore?.map?.flyTo({
                                animate: true,
                                center: {
                                    lat: home.Lat,
                                    lng: home.Lng,
                                },
                                zoom: 14,
                            });
                        }}
                    />
                }

                <Message>
                    <Message.Header>Map marker icon:</Message.Header>
                    <p>
                        Created by Venkatesh Aiyulu from the Noun Project
                    </p>
                </Message>
            </div>
        );
    }
}

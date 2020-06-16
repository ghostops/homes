import * as React from 'react';
import { HSMapStore } from '../../../lib/store/map';
import { HSHomesStore } from '../../../lib/store/homes';
import { inject, observer } from 'mobx-react';
import { Button, Modal, Icon } from 'semantic-ui-react';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

@inject('homesStore')
@inject('mapStore')
@observer
export class HSOverlay extends React.PureComponent<Props> {
    renderSelectCoordsOverlay = () => {
        if (this.props.homesStore?.createHomeStatus !== 'coords') {
            return null;
        }

        return (
            <div
                style={{
                    pointerEvents: 'all',
                    position: 'absolute',
                    bottom: 25,
                    right: 0,
                    left: 0,
                    textAlign: 'center',
                }}
            >
                <Button
                    size="huge"
                    onClick={() => {
                        this.props.mapStore?.setMapClickedLngLat(null);
                        this.props.homesStore?.setCreateHomeStatus('off');
                    }}
                >
                    Cancel
                </Button>

                <Button
                    size="huge"
                    disabled={!this.props.mapStore?.clickedLngLat}
                    onClick={() => {
                        this.props.homesStore?.setCreatedHomeData({
                            Lat: this.props.mapStore?.clickedLngLat?.lat,
                            Lng: this.props.mapStore?.clickedLngLat?.lng,
                        });

                        this.props.homesStore?.setCreateHomeStatus('info');
                    }}
                    primary
                >
                    Continue
                </Button>
            </div>
        );
    }

    renderLoading = () => {
        if (this.props.homesStore?.homesLoaded || !!this.props.homesStore?.errors.length) {
            return null;
        }

        return (
            <Modal
                open
                basic
            >
                <Modal.Content style={{ textAlign: 'center' }}>
                    <Icon
                        loading
                        name="spinner"
                        size="huge"
                        style={{ color: 'white' }}
                    />
                </Modal.Content>
            </Modal>
        );
    }

    renderError = () => {
        if (!this.props.homesStore?.errors.length) {
            return null;
        }

        return (
            <Modal
                open
                size="mini"
                closeIcon
                onClose={() => {
                    // Clear the errors to close the modal
                    if (this.props.homesStore) {
                        this.props.homesStore.errors = [];
                    }
                }}
            >
                <Modal.Header>
                    Error
                </Modal.Header>
                <Modal.Content style={{ textAlign: 'center' }}>
                    <Modal.Description>
                        {this.props.homesStore.errors.map((err) => {
                            return (
                                <p>
                                    {!!err.message ? err.message : String(err)}
                                </p>
                            );
                        })}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }

    render() {
        return (
            <div
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
            >
                {this.renderSelectCoordsOverlay()}
                {this.renderLoading()}
                {this.renderError()}
            </div>
        );
    }
}

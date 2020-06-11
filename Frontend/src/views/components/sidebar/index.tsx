import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSMapStore } from '../../../lib/store/map';
import { Form, Button, List } from 'semantic-ui-react';
import { HSImages } from '../image/home';
import { HSMoveDate, formatMoveDate } from '../home/move';

interface Props {
    homesStore?: HSHomesStore;
    mapStore?: HSMapStore;
}

interface State {
    previewImages: string[];
}

@inject('homesStore')
@inject('mapStore')
@observer
export class HSSidebar extends React.PureComponent<Props, State> {
    state: State = {
        previewImages: [],
    };

    startCreateHome = () => {
        this.props.homesStore?.setCreateHomeStatus('coords');
    }

    submitCreateHomeInfo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newHome = await this.props.homesStore?.createHome(this.props.homesStore.createdHome);

        if (newHome) {
            this.props.homesStore?.uploadSelectedImages(newHome.ID);
            this.props.homesStore?.setCreateHomeStatus('success');
            this.props.mapStore?.setMapClickedLngLat(null);

            if (this.props.homesStore) {
                this.props.homesStore.createdHome = {};
                this.props.homesStore.selectedHome = newHome;
            }
        }
    }

    renderNoSelectedHome = () => {
        return (
            <div>
                <h1>
                    Your Homes
                </h1>

                <List
                    divided
                    relaxed
                >
                    {this.props.homesStore?.homes.map((home: IHome) => {
                        return (
                            <List.Item>
                                <List.Icon
                                    name='home'
                                    size='large'
                                    verticalAlign='middle'
                                />
                                <List.Content>
                                    <List.Header
                                        as='a'
                                        onClick={() => {
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
                                    >
                                        {home.Name}
                                    </List.Header>

                                    <List.Description>
                                        {formatMoveDate(new Date(home.MovedIn))} - {formatMoveDate(new Date(home.MovedOut))}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    })}
                </List>
                <p>
                    Map marker icon:<br />
                    Created by Venkatesh Aiyulu from the Noun Project
                </p>
            </div>
        );
    }

    renderSelectedHome = () => {
        const home = this.props.homesStore?.selectedHome as IHome;

        return (
            <div>
                <h1>
                    {home.Name}
                </h1>

                <HSMoveDate
                    label="Moved in:"
                    date={new Date(home.MovedIn)}
                />

                <HSMoveDate
                    label="Moved out:"
                    date={new Date(home.MovedOut)}
                />

                <HSImages
                    sources={home.Images}
                    open
                />
            </div>
        );
    }

    renderDeafultSidebar = () => {
        return (
            <>
                <div className="sidebar-content">
                    {
                        !!this.props.homesStore?.selectedHome
                        ? this.renderSelectedHome()
                        : this.renderNoSelectedHome()
                    }
                </div>

                <footer className="sidebar-footer">
                    {
                        !!this.props.homesStore?.selectedHome &&
                        <Button
                            onClick={() => {
                                if (this.props.homesStore) {
                                    this.props.homesStore.selectedHome = null;
                                }
                            }}
                        >
                            Close open Home
                        </Button>
                    }

                    <Button
                        onClick={this.startCreateHome}
                    >
                        Add new Home
                    </Button>

                    {
                        !!this.props.homesStore?.selectedHome &&
                        <Button
                            onClick={() => {
                                if (this.props.homesStore) {
                                    const id = this.props.homesStore.selectedHome?.ID;

                                    if (id) {
                                        this.props.homesStore.deleteHome(id);
                                    }
                                }
                            }}
                            color="red"
                        >
                            Delete Home
                        </Button>
                    }
                </footer>
            </>
        );
    }

    renderCreateHomeInfo = () => {
        const submitDisabled = (
            !this.props.homesStore?.createdHome.Name ||
            !this.props.homesStore?.createdHome.MovedIn ||
            !this.props.homesStore?.createdHome.MovedOut
        );

        return (
            <div className="sidebar-content">
                <Form
                    onSubmit={this.submitCreateHomeInfo}
                >
                    <h1>
                        Describe your home
                    </h1>

                    <Form.Field>
                        <label>Name your Home</label>
                        <input
                            placeholder="Home Name"
                            type="text"
                            onChange={(event) => {
                                this.props.homesStore?.setCreatedHomeData({
                                    Name: event.target.value,
                                });
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Moved In</label>
                        <input
                            placeholder='Move in date'
                            type="date"
                            onChange={(event) => {
                                this.props.homesStore?.setCreatedHomeData({
                                    MovedIn: event.target.value,
                                });
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Moved Out</label>
                        <input
                            placeholder='Move out date'
                            type="date"
                            onChange={(event) => {
                                this.props.homesStore?.setCreatedHomeData({
                                    MovedOut: event.target.value,
                                });
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => {
                                this.setState({ previewImages: [] });

                                for (const file of event.target.files as unknown as Blob[]) {
                                    const reader = new FileReader();

                                    reader.onload = (e) => {
                                        if (e.target) {
                                            this.setState({
                                                previewImages:
                                                    this.state.previewImages.concat(e.target.result as string),
                                            });
                                        }
                                    };

                                    reader.readAsDataURL(file);
                                    this.props.homesStore?.addUploadableImage(file);
                                }
                            }}
                        />

                        {
                            !!this.state.previewImages.length &&
                            <HSImages sources={this.state.previewImages} />
                        }
                    </Form.Field>

                    <Button
                        type="button"
                        onClick={() => {
                            this.props.homesStore?.setCreateHomeStatus('coords');
                        }}
                    >
                        Go back
                    </Button>

                    <Button
                        type="submit"
                        disabled={submitDisabled}
                        primary
                    >
                        Continue
                    </Button>
                </Form>
            </div>
        );
    }

    renderCreateHomeSuccess = () => {
        return (
            <div className="sidebar-content">
                <h1>Your Home has been added!</h1>

                <Button
                    onClick={() => {
                        this.props.homesStore?.setCreateHomeStatus('off');
                    }}
                    primary
                    size="huge"
                >
                    Done
                </Button>
            </div>
        );
    }

    renderSidebarContent = () => {
        switch(this.props.homesStore?.createHomeStatus) {
            case 'info':
                return this.renderCreateHomeInfo();
            case 'success':
                return this.renderCreateHomeSuccess();
            default:
                return this.renderDeafultSidebar();
        }
    }

    render() {
        return (
            <aside className="sidebar">
                {this.renderSidebarContent()}
            </aside>
        );
    }
}

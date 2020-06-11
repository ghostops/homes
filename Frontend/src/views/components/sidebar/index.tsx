import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSMapStore } from '../../../lib/store/map';
import { Form, Button } from 'semantic-ui-react';
import { HSImages } from '../image/home';

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

            if (this.props.homesStore) {
                this.props.homesStore.createdHome = {};
            }
        }
    }

    renderNoSelectedHome = () => {
        return (
            <div>
                <h1>
                    Your Homes
                </h1>

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

                <div>
                    <p>
                        Moved in:
                    </p>
                    <p>
                        {home.MovedIn}
                    </p>
                </div>

                <div>
                    <p>
                        Moved out:
                    </p>
                    <p>
                        {home.MovedOut}
                    </p>
                </div>

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
                        this.props.mapStore?.setMapClickedLngLat(null);
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

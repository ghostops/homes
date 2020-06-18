import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HSMapStore } from '../../../lib/store/map';
import { HSHomesStore } from '../../../lib/store/homes';
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
export class HSHomeCreator extends React.PureComponent<Props, State> {
    state: State = {
        previewImages: [],
    }

    submitCreateHomeInfo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newHome = await this.props.homesStore?.createHome(this.props.homesStore.createdHome);

        if (newHome) {
            await this.props.homesStore?.uploadSelectedImages(newHome.ID);
            this.props.homesStore?.setCreateHomeStatus('success');
            this.props.mapStore?.setMapClickedLngLat(null);

            if (this.props.homesStore) {
                this.props.homesStore.createdHome = {};
                this.props.homesStore.setSelectedHome(newHome);
            }
        }
    }

    render() {
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
}

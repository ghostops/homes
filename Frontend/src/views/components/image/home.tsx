import * as React from 'react';
import { Grid, Image, Modal } from 'semantic-ui-react';

interface Props {
    sources: string[];
    open?: boolean;
}

interface State {
    modalOpen: boolean;
    selectedImage: string | null;
}

export class HSImages extends React.PureComponent<Props, State> {
    state: State = {
        modalOpen: false,
        selectedImage: null,
    };

    render() {
        return (
            <>
            <Grid
                columns={4}
                padded
            >
                {this.props.sources.map((src, index) => {
                    return (
                        <Grid.Column key={index}>
                            <Image
                                src={src}
                                size="medium"
                                style={{ cursor: this.props.open ? 'pointer' : 'default' }}
                                onClick={() => {
                                    if (!this.props.open) return;

                                    this.setState({
                                        modalOpen: true,
                                        selectedImage: src,
                                    });
                                }}
                            />
                        </Grid.Column>
                    )
                })}
            </Grid>
            <Modal
                open={this.state.modalOpen}
                centered
                closeIcon
                size="mini"
                onClose={() => {
                    this.setState({
                        modalOpen: false,
                        selectedImage: null,
                    });
                }}
            >
                <Modal.Content
                    image
                >
                    <Image
                        src={this.state.selectedImage}
                        size="large"
                        onClick={() => {
                            this.setState({ modalOpen: true });
                        }}
                    />
                </Modal.Content>
            </Modal>
            </>
        )
    }
}

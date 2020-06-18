import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { Authentication } from '../../../lib/auth';
import { Modal, Form, Button, Message } from 'semantic-ui-react';

interface Props {
    onSuccess?: () => void;
    homesStore?: HSHomesStore;
}

interface State {
    username: string;
    password: string;
    error: string;
    loading: boolean;
}

@inject('homesStore')
@observer
export class HSAuthPortal extends React.PureComponent<Props, State> {
    state: State = {
        password: '',
        username: '',
        error: '',
        loading: false,
    }

    authenticate = async (username: string, password: string) => {
        this.setState({ error: '', loading: true });

        const encoded = btoa(`${username}:${password}`);
        this.props.homesStore?.apiClient.setBasicAuthentication(encoded);

        try {
            await this.props.homesStore?.apiClient.testBasicAuthentication();

            Authentication.setAuthToken(encoded);

            if (this.props.onSuccess) {
                this.props.onSuccess();
            }
        } catch {
            this.setState({ error: 'Invalid credentials', loading: false });
        }
    }

    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.authenticate(this.state.username, this.state.password);
    }

    render() {
        const submitDisabled = (
            this.state.username.length < 1 ||
            this.state.password.length < 1
        );

        return (
            <Modal
                open
                size="tiny"
            >
                <Modal.Header>
                    Log in
                </Modal.Header>

                <Modal.Content>
                    {
                        this.state.error &&
                        <Message negative>
                            <Message.Header>Login error</Message.Header>
                            <p>{this.state.error}</p>
                        </Message>
                    }

                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Field>
                            <label>Username</label>
                            <input
                                placeholder="Username"
                                type="text"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({ username: event.target.value });
                                }}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Password</label>
                            <input
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({ password: event.target.value });
                                }}
                            />
                        </Form.Field>

                        <Button
                            type="submit"
                            disabled={this.state.loading || submitDisabled}
                            primary
                        >
                            Sign in
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

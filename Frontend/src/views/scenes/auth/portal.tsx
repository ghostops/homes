import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { Authentication } from '../../../lib/auth';
import { Modal, Form, Button } from 'semantic-ui-react';

interface Props {
    onSuccess?: () => void;
    homesStore?: HSHomesStore;
}

interface State {
    username: string;
    password: string;
}

@inject('homesStore')
@observer
export class HSAuthPortal extends React.PureComponent<Props, State> {
    state: State = {
        password: '',
        username: '',
    }

    authenticate = async (username: string, password: string) => {
        const encoded = btoa(`${username}:${password}`);
        this.props.homesStore?.apiClient.setBasicAuthentication(encoded);

        try {
            const valid = await this.props.homesStore?.apiClient.testBasicAuthentication();

            if (valid) {
                Authentication.setAuthToken(encoded);

                if (this.props.onSuccess) {
                    this.props.onSuccess();
                }
            } else {
                alert('Something went wrong...');
            }
        } catch {
            alert('Invalid credentials');
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
                            disabled={submitDisabled}
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

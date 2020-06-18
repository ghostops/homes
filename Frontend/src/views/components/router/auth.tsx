import * as React from 'react';
import { inject } from 'mobx-react';
import { Authentication } from '../../../lib/auth';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSAuthPortal } from '../../scenes/auth/portal';
import { HSHome } from '../../scenes/home';
import { HSLoadingOverlay } from '../loading/overlay';

interface Props {
    homesStore?: HSHomesStore;
}

interface State {
    authenticated: boolean;
    loading: boolean;
}

@inject('homesStore')
export class AuthRouter extends React.PureComponent<Props, State> {
    state: State = {
        authenticated: false,
        loading: true,
    };

    async componentDidMount() {
        try {
            this.props.homesStore?.apiClient.setBasicAuthentication(Authentication.getAuthToken());
            await this.props.homesStore?.apiClient.testBasicAuthentication();
            this.setState({ authenticated: true });
        } catch (err) {
            console.warn(err);
            Authentication.setAuthToken(null);
            this.setState({ authenticated: false });
        } finally {
            this.setState({ loading: false });
        }
    }

    onAuthenticated = () => this.setState({ authenticated: Authentication.isAuthenticated() });

    render() {
        if (this.state.loading) {
            return <HSLoadingOverlay />
        }

        if (!this.state.authenticated) {
            return (
                <HSAuthPortal onSuccess={this.onAuthenticated} />
            );
        }

        return <HSHome />;
    }
}

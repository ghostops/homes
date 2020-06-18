import * as React from 'react';
import { rootStore } from './lib/store';
import { Provider } from 'mobx-react';
import { HSHome } from './views/scenes/home';
import { Authentication } from './lib/auth';
import { HSAuthPortal } from './views/scenes/auth/portal';

interface State {
    authenticated: boolean;
}

class StupidRouter extends React.PureComponent<any, State> {
    state: State = { authenticated: Authentication.isAuthenticated() };

    onAuthenticated = () => this.setState({ authenticated: Authentication.isAuthenticated() });

    componentDidMount() {
        console.log(this.state.authenticated);
    }

    render() {
        if (!this.state.authenticated) {
            return (
                <HSAuthPortal onSuccess={this.onAuthenticated} />
            );
        }

        return (
            <>
                <HSHome />
            </>
        )
    }
}

export class App extends React.PureComponent {

    render() {
        return (
            <Provider {...rootStore}>
                <StupidRouter />
            </Provider>
        );
    }
}

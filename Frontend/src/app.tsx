import * as React from 'react';
import { rootStore } from './lib/store';
import { Provider } from 'mobx-react';
import { Auth0Provider } from './views/scenes/login/auth0';
import { HSStupidRouter } from './views/components/stupidrouter';
import { hasAuth } from './lib/util';

const WithOrWithoutAuth: React.SFC = ({ children }) => {
    if (!hasAuth)
        return <>{children}</>;

    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
            client_id={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
            redirect_uri={window.location.origin}
        >
            {children}
        </Auth0Provider>
    );
}

export const App: React.SFC = () => {
    return (
        <Provider {...rootStore}>
            <WithOrWithoutAuth>
                <HSStupidRouter hasAuth={hasAuth} />
            </WithOrWithoutAuth>
        </Provider>
    );
}

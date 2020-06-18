import * as React from 'react';
import { rootStore } from './lib/store';
import { Provider } from 'mobx-react';
import { AuthRouter } from './views/components/router/auth';

export class App extends React.PureComponent {
    render() {
        return (
            <Provider {...rootStore}>
                <AuthRouter />
            </Provider>
        );
    }
}

import * as React from 'react';
import { HSHome } from './views/scenes/home';
import { rootStore } from './lib/store';
import { Provider } from 'mobx-react';

export const App: React.SFC = () => {
    return (
        <Provider {...rootStore}>
            <HSHome />
        </Provider>
    );
}

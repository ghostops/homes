import * as React from 'react';
import { rootStore } from './lib/store';
import { Provider } from 'mobx-react';
import { HSHome } from './views/scenes/home';

export const App: React.SFC = () => {
    return (
        <Provider {...rootStore}>
            <HSHome />
        </Provider>
    );
}

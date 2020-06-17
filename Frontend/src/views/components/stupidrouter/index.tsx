import * as React from 'react';
import { HSHome } from '../../scenes/home';
import { HSLoginPortal } from '../../scenes/login';
import { inject, observer } from 'mobx-react';
import { HSAuthStore } from '../../../lib/store/auth';
import { HSLoadingOverlay } from '../loading/overlay';

interface Props {
    hasAuth?: boolean;
    authStore?: HSAuthStore;
}


@inject('authStore')
@observer
export class HSStupidRouter extends React.PureComponent<Props> {
    render() {
        const { loading, isAuthenticated } = this.props.authStore as HSAuthStore;

        if (!this.props.hasAuth) {
            return <HSHome />;
        }

        if (loading) {
            return <HSLoadingOverlay />;
        }

        return (
            isAuthenticated
            ? <HSHome />
            : <HSLoginPortal />
        );
    }
};

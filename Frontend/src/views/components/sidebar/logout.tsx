import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { Authentication } from '../../../lib/auth';

export const HSLogout: React.SFC = () => {
    return (
        <Button
            onClick={() => {
                Authentication.setAuthToken(null);
                window.location.reload();
            }}
            style={{ float: 'right' }}
        >
            Log out
        </Button>
    );
};

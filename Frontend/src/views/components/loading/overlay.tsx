import * as React from 'react';
import { Modal, Icon } from 'semantic-ui-react';

export const HSLoadingOverlay: React.SFC = () => {
    return (
        <Modal
            open
            basic
        >
            <Modal.Content style={{ textAlign: 'center' }}>
                <Icon
                    loading
                    name="spinner"
                    size="huge"
                    style={{ color: 'white' }}
                />
            </Modal.Content>
        </Modal>
    );
};

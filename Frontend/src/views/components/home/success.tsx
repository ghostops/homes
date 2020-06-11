import * as React from 'react';
import { HSHomesStore } from '../../../lib/store/homes';
import { observer, inject } from 'mobx-react';
import { Button } from 'semantic-ui-react';

interface Props {
    homesStore?: HSHomesStore;
}

@inject('homesStore')
@observer
export class HSHomeSuccess extends React.PureComponent<Props> {
    render() {
        return (
            <div className="sidebar-content">
                <h1>Your Home has been added!</h1>

                <Button
                    onClick={() => {
                        this.props.homesStore?.setCreateHomeStatus('off');
                    }}
                    primary
                    size="huge"
                >
                    Done
                </Button>
            </div>
        );
    }
}

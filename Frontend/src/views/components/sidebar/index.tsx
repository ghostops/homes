import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HSHomesStore } from '../../../lib/store/homes';
import { Form, Button, List } from 'semantic-ui-react';
import { HSImages } from '../image/home';
import { HSMoveDate, formatMoveDate } from '../home/move';
import { HSHome } from '../home';
import { HSHomeList } from '../home/list';
import { HSHomeCreator } from '../home/create';
import { HSSidebarHomeList } from './list';
import { HSHomeSuccess } from '../home/success';

interface Props {
    homesStore?: HSHomesStore;
}

@inject('homesStore')
@observer
export class HSSidebar extends React.PureComponent<Props> {
    renderDeafultSidebar = () => {
        const selectedHome = this.props.homesStore?.selectedHome;

        return (
            <>
                <div className="sidebar-content">
                    {
                        !!selectedHome
                        ? <HSHome home={selectedHome} />
                        : <HSSidebarHomeList />
                    }
                </div>

                <footer className="sidebar-footer">
                    {
                        !!selectedHome&&
                        <Button
                            onClick={() => {
                                if (this.props.homesStore) {
                                    this.props.homesStore.selectedHome = null;
                                }
                            }}
                        >
                            Close open Home
                        </Button>
                    }

                    <Button
                        onClick={() => {
                            this.props.homesStore?.setCreateHomeStatus('coords');
                        }}
                    >
                        Add new Home
                    </Button>

                    {
                        !!selectedHome &&
                        <Button
                            onClick={() => {
                                if (this.props.homesStore) {
                                    const id = this.props.homesStore.selectedHome?.ID;

                                    if (id) {
                                        this.props.homesStore.deleteHome(id);
                                    }
                                }
                            }}
                            color="red"
                        >
                            Delete Home
                        </Button>
                    }
                </footer>
            </>
        );
    }

    renderSidebarContent = () => {
        switch(this.props.homesStore?.createHomeStatus) {
            case 'info':
                return <HSHomeCreator />;
            case 'success':
                return <HSHomeSuccess />;
            default:
                return this.renderDeafultSidebar();
        }
    }

    render() {
        return (
            <aside className="sidebar">
                {this.renderSidebarContent()}
            </aside>
        );
    }
}

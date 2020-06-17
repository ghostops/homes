import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { HSHome } from '../home';
import { HSHomeCreator } from '../home/create';
import { HSHomesStore } from '../../../lib/store/homes';
import { HSHomeSuccess } from '../home/success';
import { HSSidebarHomeList } from './list';
import { inject, observer } from 'mobx-react';
import { HSLogout } from './logout';

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
                                    this.props.homesStore.setSelectedHome(null);
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

                    <HSLogout />
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
                <header style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '20px 0',
                }}>
                    <img src="/Logo.png" alt="HomeApp"/>
                </header>

                {this.renderSidebarContent()}
            </aside>
        );
    }
}

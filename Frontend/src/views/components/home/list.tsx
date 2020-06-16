import * as React from 'react';
import { formatMoveDate } from './move';
import { List, Placeholder } from 'semantic-ui-react';
import _ from 'lodash';

interface Props {
    homes: IHome[];
    onHomeClick?: (home: IHome) => void;
}

export const HSHomeList: React.SFC<Props> = ({ homes, onHomeClick }) => {
    if (!homes || !homes.length) {
        return (
            <Placeholder>
                {_.range(15).map(() => <Placeholder.Line />)}
            </Placeholder>
        )
    }

    return (
        <List
            divided
            relaxed
        >
            {homes.map((home: IHome) => {
                return (
                    <List.Item key={home.ID}>
                        <List.Icon
                            name='home'
                            size='large'
                            verticalAlign='middle'
                        />
                        <List.Content>
                            <List.Header
                                as='a'
                                onClick={() => {
                                    if (onHomeClick) {
                                        onHomeClick(home);
                                    }
                                }}
                            >
                                {home.Name}
                            </List.Header>

                            <List.Description>
                                {formatMoveDate(new Date(home.MovedIn))} - {formatMoveDate(new Date(home.MovedOut))}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                )
            })}
        </List>
    );
}

import * as React from 'react';
import { formatMoveDate } from './move';
import { List } from 'semantic-ui-react';

interface Props {
    homes: IHome[];
    onHomeClick?: (home: IHome) => void;
}

export const HSHomeList: React.SFC<Props> = ({ homes, onHomeClick }) => {
    return (
        <List
            divided
            relaxed
        >
            {homes.map((home: IHome) => {
                return (
                    <List.Item>
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

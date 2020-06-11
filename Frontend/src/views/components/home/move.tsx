import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import _ from 'lodash';

interface Props {
    label: string;
    date: Date;
}

export const formatMoveDate = (date: Date) =>
    `${date.getFullYear()}-${_.padStart((date.getMonth() + 1).toString(), 2, '0')}-${_.padStart(date.getDate().toString(), 2, '0')}`;

export const HSMoveDate: React.SFC<Props> = ({ date, label }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                background: '#dfe4ea',
                justifyContent: 'space-between',
                padding: 10,
                borderRadius: 4,
                marginBottom: 10,
            }}
        >
            <p style={{
                fontWeight: 'bold',
                margin: 0,
            }}>
                {label}
            </p>

            {
                date > new Date()
                ? (
                    <p>
                        Living here now
                    </p>
                ) : (
                    <p style={{
                        margin: 0,
                    }}>
                        {formatMoveDate(date)}
                        <Icon name="calendar alternate outline" />
                    </p>
                )
            }
        </div>
    )
};

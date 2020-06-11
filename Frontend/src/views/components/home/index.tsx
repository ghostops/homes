import * as React from 'react';
import { HSMoveDate } from './move';
import { HSImages } from '../image/home';

interface Props {
    home: IHome;
}

export const HSHome: React.SFC<Props> = ({ home }) => {
    return (
        <div>
            <h1>
                {home.Name}
            </h1>

            <HSMoveDate
                label="Moved in:"
                date={new Date(home.MovedIn)}
            />

            <HSMoveDate
                label="Moved out:"
                date={new Date(home.MovedOut)}
            />

            <HSImages
                sources={home.Images}
                open
            />
        </div>
    );
}

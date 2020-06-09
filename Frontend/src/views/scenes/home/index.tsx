import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { HSMap } from '../../components/map';

export class HSHome extends React.PureComponent {
    render() {
        return (
            <Grid padded>
                <Grid.Column width={10}>
                    <HSMap />
                </Grid.Column>

                <Grid.Column width={6}>
                    Sidebar
                </Grid.Column>
            </Grid>
        );
    }
}

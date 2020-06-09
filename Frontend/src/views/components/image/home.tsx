import * as React from 'react';
import { Grid, Image } from 'semantic-ui-react';

interface Props {
    sources: string[];
}

export class HSImages extends React.PureComponent<Props> {
    render() {
        return (
            <Grid
                columns={4}
                padded
            >
                {this.props.sources.map((src, index) => {
                    return (
                        <Grid.Column key={index}>
                            <Image
                                src={src}
                                size="medium"
                            />
                        </Grid.Column>
                    )
                })}
            </Grid>
        )
    }
}

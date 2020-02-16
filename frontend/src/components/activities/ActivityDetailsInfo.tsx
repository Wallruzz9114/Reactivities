import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';

interface IProps {
	activity: IActivity | undefined;
}

const ActivityDetailsInfo: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	return (
		<Segment.Group>
			<Segment attached='top'>
				<Grid>
					<Grid.Column width={1}>
						<Icon size='large' color='teal' name='info' />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{props.activity?.description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached={true}>
				<Grid verticalAlign='middle'>
					<Grid.Column width={1}>
						<Icon name='calendar' size='large' color='teal' />
					</Grid.Column>
					<Grid.Column width={15}>
						<span>{props.activity?.date}</span>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached={true}>
				<Grid verticalAlign='middle'>
					<Grid.Column width={1}>
						<Icon name='marker' size='large' color='teal' />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>
							{props.activity?.venue}, {props.activity?.city}
						</span>
					</Grid.Column>
				</Grid>
			</Segment>
		</Segment.Group>
	);
};

export default ActivityDetailsInfo;

import React from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';
import { Link } from 'react-router-dom';

interface IProps {
	activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular={true} src='/assets/user.png' />
						<Item.Content>
							<Item.Header as='a'>{props.activity.title}</Item.Header>
							<Item.Description>Hosted by Jose</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<Icon name='clock' /> {props.activity.date}
				<Icon name='marker' /> {props.activity.venue}, {props.activity.city}
			</Segment>
			<Segment secondary={true}>Attendies will go here</Segment>
			<Segment clearing={true}>
				<span>{props.activity.description}</span>
				<Button
					as={Link}
					to={`/activities/${props.activity.id}`}
					floated='right'
					content='View'
					color='blue'
				/>
			</Segment>
		</Segment.Group>
	);
};

export default ActivityListItem;

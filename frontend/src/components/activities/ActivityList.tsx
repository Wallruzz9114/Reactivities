import React from 'react';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';

interface IProps {
	activities: IActivity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	return (
		<Segment clearing={true}>
			<Item.Group divided={true}>
				{props.activities.map((activity: IActivity) => (
					<Item key={activity.id}>
						<Item.Content>
							<Item.Header as='a'>{activity.title}</Item.Header>
							<Item.Meta>{activity.date}</Item.Meta>
							<Item.Description>
								<div>{activity.description}</div>
								<div>
									{activity.city}, {activity.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => props.deleteActivity(activity.id)}
									floated='right'
									content='Delete'
									color='red'
								/>
								<Button
									onClick={() => props.selectActivity(activity.id)}
									floated='right'
									content='View'
									color='blue'
								/>
								<Label basic={true} content={activity.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
};

export default ActivityList;

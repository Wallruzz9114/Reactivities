import React, { useContext } from 'react';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';
import { observer } from 'mobx-react-lite';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';

const ActivityList: React.FC = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	return (
		<Segment clearing={true}>
			<Item.Group divided={true}>
				{activityStore.activitiesSortedByDate.map((activity: IActivity) => (
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
									name={activity.id}
									onClick={(
										event: React.MouseEvent<HTMLButtonElement, MouseEvent>
									) => activityStore.deleteActivity(activity.id, event)}
									loading={
										activityStore.targetElement === activity.id &&
										activityStore.submitting
									}
									floated='right'
									content='Delete'
									color='red'
								/>
								<Button
									onClick={() => activityStore.selectActivity(activity.id)}
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

export default observer(ActivityList);

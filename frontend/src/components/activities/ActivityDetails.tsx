import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	return (
		<Card fluid={true}>
			<Image
				src={`/assets/${activityStore.selectedActivity?.category}.jpg`}
				wrapped={true}
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{activityStore.selectedActivity?.title}</Card.Header>
				<Card.Meta>
					<span>{activityStore.selectedActivity?.date}</span>
				</Card.Meta>
				<Card.Description>
					{activityStore.selectedActivity?.description}
				</Card.Description>
			</Card.Content>
			<Card.Content extra={true}>
				<Button.Group widths={2}>
					<Button
						onClick={() =>
							activityStore.openEditActivityForm(
								activityStore.selectedActivity?.id
							)
						}
						basic={true}
						color='blue'
						content='Edit'
					/>
					<Button
						onClick={activityStore.cancelSelectedActivity}
						basic={true}
						color='orange'
						content='Cancel'
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default observer(ActivityDetails);

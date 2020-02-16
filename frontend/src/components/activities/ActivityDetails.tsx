import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingIndicator from '../shared/LoadingIndicator';

interface IActivityDetails {
	id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IActivityDetails>> = (
	routeComponent: React.PropsWithChildren<RouteComponentProps<IActivityDetails>>
) => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	useEffect(() => {
		activityStore.loadActivity(routeComponent.match.params.id);
	}, [
		activityStore,
		activityStore.loadActivity,
		routeComponent.match.params.id
	]);

	return activityStore.loadingInitial ? (
		<LoadingIndicator content='Loading activity...' />
	) : (
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
						as={Link}
						to={`/activity/${activityStore.selectedActivity?.id}`}
						basic={true}
						color='blue'
						content='Edit'
					/>
					<Button
						onClick={() => routeComponent.history.push('/activities')}
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

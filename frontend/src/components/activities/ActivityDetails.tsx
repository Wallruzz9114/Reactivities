import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingIndicator from '../shared/LoadingIndicator';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';

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
		<Grid>
			<Grid.Column width={10}>
				<ActivityDetailsHeader activity={activityStore.selectedActivity} />
				<ActivityDetailsInfo activity={activityStore.selectedActivity} />
				<ActivityDetailsChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityDetailsSidebar />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDetails);

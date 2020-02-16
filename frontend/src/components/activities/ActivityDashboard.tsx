import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import LoadingIndicator from '../shared/LoadingIndicator';

const ActivityDashboard: React.FC = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial) {
		return <LoadingIndicator content='Loading activities...' />;
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Activity filters</h2>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);

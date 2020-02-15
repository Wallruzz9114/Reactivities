import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';

const ActivityDashboard: React.FC = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width={6}>
				{activityStore.selectedActivity && !activityStore.editMode && (
					<ActivityDetails />
				)}
				{activityStore.editMode && (
					<ActivityForm
						key={
							(activityStore.selectedActivity &&
								activityStore.selectedActivity.id) ||
							0
						}
						selectedActivity={activityStore.selectedActivity}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);

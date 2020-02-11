import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from './ActivityForm';

interface IProps {
	activities: IActivity[];
	selectActivity: (id: string) => void;
	selectedActivity: IActivity | null;
	editMode: boolean;
	setEditMode: (editMode: boolean) => void;
	setSelectedActivity: (activity: IActivity | null) => void;
	createActivity: (newActivity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	deleteActivity: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string
	) => void;
	submitting: boolean;
	target: string;
}

const ActivityDashboard: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList
					activities={props.activities}
					selectActivity={props.selectActivity}
					deleteActivity={props.deleteActivity}
					submitting={props.submitting}
					target={props.target}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{props.selectedActivity && !props.editMode && (
					<ActivityDetails
						activity={props.selectedActivity}
						setEditMode={props.setEditMode}
						setSelectedActivity={props.setSelectedActivity}
					/>
				)}
				{props.editMode && (
					<ActivityForm
						key={(props.selectedActivity && props.selectedActivity.id) || 0}
						selectedActivity={props.selectedActivity}
						setEditMode={props.setEditMode}
						createActivity={props.createActivity}
						editActivity={props.editActivity}
						submitting={props.submitting}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default ActivityDashboard;

import React, { useState, useEffect, CSSProperties, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/IActivity';
import NavBar from '../components/navbar/NavBar';
import ActivityDashboard from '../components/activities/ActivityDashboard';
import { ServiceAgent } from '../services/SeviceAgent';
import LoadingIndicator from '../components/shared/LoadingIndicator';

const App: () => JSX.Element = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
		null
	);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [loading, setloading] = useState<boolean>(true);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [target, setTarget] = useState<string>('');

	const handleSelectedActivity: (id: string) => void = (id: string) => {
		setSelectedActivity(activities.filter((a: IActivity) => a.id === id)[0]);
		setEditMode(false);
	};

	const handleCreateActivityForm: () => void = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	const handleCreateActivity: (newActivity: IActivity) => void = (
		newActivity: IActivity
	) => {
		setSubmitting(true);
		ServiceAgent.ACTIVITIES.createActivity(newActivity)
			.then(() => {
				setActivities([...activities, newActivity]);
				setSelectedActivity(newActivity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleEditActivity: (activity: IActivity) => void = (
		activity: IActivity
	) => {
		setSubmitting(true);
		ServiceAgent.ACTIVITIES.updateActivity(activity)
			.then(() => {
				setActivities([
					...activities.filter((a: IActivity) => a.id !== activity.id),
					activity
				]);
				setSelectedActivity(activity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleDeleteActivity: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string
	) => void = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: string
	) => {
		setSubmitting(true);
		setTarget(event.currentTarget.name);
		ServiceAgent.ACTIVITIES.deleteActivity(id)
			.then(() => {
				setActivities([...activities.filter((a: IActivity) => a.id !== id)]);
			})
			.then(() => setSubmitting(false));
	};

	useEffect(() => {
		ServiceAgent.ACTIVITIES.getAllActivities()
			.then((response: IActivity[]) => {
				const allActivities: IActivity[] = [];

				response.forEach((activity: IActivity) => {
					activity.date = activity.date.split('.')[0];
					allActivities.push(activity);
				});

				setActivities(allActivities);
			})
			.then(() => setloading(false));
	}, []);

	if (loading) {
		return <LoadingIndicator content='Loading activities...' />;
	}

	return (
		<Fragment>
			<NavBar openCreateActivityForm={handleCreateActivityForm} />
			<Container style={containerStyle}>
				<ActivityDashboard
					activities={activities}
					selectActivity={handleSelectedActivity}
					selectedActivity={selectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedActivity={setSelectedActivity}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					deleteActivity={handleDeleteActivity}
					submitting={submitting}
					target={target}
				/>
			</Container>
		</Fragment>
	);
};

const containerStyle: CSSProperties = {
	marginTop: '7em'
};

export default App;

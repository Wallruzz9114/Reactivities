import React, { useState, useEffect, CSSProperties, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Constants } from '../constants/constants';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../components/navbar/NavBar';
import ActivityDashboard from '../components/activities/ActivityDashboard';

const App: () => JSX.Element = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
		null
	);
	const [editMode, setEditMode] = useState<boolean>(false);

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
		setActivities([...activities, newActivity]);
		setSelectedActivity(newActivity);
		setEditMode(false);
	};

	const handleEditActivity: (activity: IActivity) => void = (
		activity: IActivity
	) => {
		setActivities([
			...activities.filter((a: IActivity) => a.id !== activity.id),
			activity
		]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleDeleteActivity: (id: string) => void = (id: string) => {
		setActivities([...activities.filter((a: IActivity) => a.id !== id)]);
	};

	useEffect(() => {
		axios
			.get<IActivity[]>(Constants.GET_ACTIVITIES_URL)
			.then((response: AxiosResponse<IActivity[]>) => {
				const allActivities: IActivity[] = [];

				response.data.forEach((activity: IActivity) => {
					activity.date = activity.date.split('.')[0];
					allActivities.push(activity);
				});

				setActivities(allActivities);
			});
	}, []);

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
				/>
			</Container>
		</Fragment>
	);
};

const containerStyle: CSSProperties = {
	marginTop: '7em'
};

export default App;

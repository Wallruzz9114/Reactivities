import React, { useEffect, CSSProperties, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../components/navbar/NavBar';
import ActivityDashboard from '../components/activities/ActivityDashboard';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import ActivityStore, { MyActivityStore } from '../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const App: () => JSX.Element = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial) {
		return <LoadingIndicator content='Loading activities...' />;
	}

	return (
		<Fragment>
			<NavBar />
			<Container style={containerStyle}>
				<ActivityDashboard />
			</Container>
		</Fragment>
	);
};

const containerStyle: CSSProperties = {
	marginTop: '7em'
};

export default observer(App);

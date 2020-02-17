import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../components/navbar/NavBar';
import ActivityDashboard from '../components/activities/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { CustomStyles } from '../styles/CustomStyles';
import {
	Route,
	withRouter,
	RouteComponentProps,
	Switch
} from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import ActivityForm from '../components/activities/ActivityForm';
import ActivityDetails from '../components/activities/ActivityDetails';
import NotFound from '../components/pages/Notfound';

const App: React.FC<RouteComponentProps> = (
	routeComponent: React.PropsWithChildren<RouteComponentProps>
) => {
	return (
		<Fragment>
			<ToastContainer position='bottom-right' />
			<Route exact={true} path='/' component={HomePage} />
			<Route
				exact={true}
				path={'/(.+)'}
				render={() => (
					<Fragment>
						<NavBar />
						<Container style={CustomStyles.MAIN_CONTAINER_STYLE}>
							<Switch>
								<Route
									exact={true}
									path='/activities'
									component={ActivityDashboard}
								/>
								<Route path='/activities/:id' component={ActivityDetails} />
								<Route
									key={routeComponent.location.key}
									path={['/new-activity', '/activity/:id']}
									component={ActivityForm}
								/>
								<Route component={NotFound} />
							</Switch>
						</Container>
					</Fragment>
				)}
			/>
		</Fragment>
	);
};

export default withRouter(observer(App));

import React from 'react';
import { Container } from 'semantic-ui-react';
import { CustomStyles } from '../../styles/CustomStyles';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<Container style={CustomStyles.MAIN_CONTAINER_STYLE}>
			<h1>Home Page</h1>
			<h3>
				Go to <Link to='/activities'>Activities</Link>
			</h3>
		</Container>
	);
};

export default HomePage;

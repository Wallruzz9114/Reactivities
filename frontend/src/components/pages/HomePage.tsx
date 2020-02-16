import React from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { CustomStyles } from '../../styles/CustomStyles';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<Segment
			inverted={true}
			textAlign='center'
			vertical={true}
			className='masthead'
		>
			<Container text={true}>
				<Header as='h1' inverted={true}>
					<Image
						size='massive'
						src='/assets/logo.png'
						alt='logo'
						style={CustomStyles.MARGIN_BOTTOM}
					/>
					Reactivities
				</Header>
				<Header as='h2' inverted={true} content='Welcome to Reactivities' />
				<Button as={Link} to='/activities' size='huge' inverted={true}>
					Take me to the activities!
				</Button>
			</Container>
		</Segment>
	);
};

export default HomePage;

import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<Segment placeholder={true}>
			<Header icon={true}>
				<Icon name='search' />
				Oops - we've looked everywhere but couldn't find this.
			</Header>
			<Segment.Inline>
				<Button as={Link} to='/activities' primary={true}>
					Return to Activities page
				</Button>
			</Segment.Inline>
		</Segment>
	);
};

export default NotFound;

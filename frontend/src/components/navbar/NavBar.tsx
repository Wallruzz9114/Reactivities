import React, { CSSProperties } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
	return (
		<Menu fixed='top' inverted={true}>
			<Container>
				<Menu.Item header={true} as={NavLink} to='/' exact={true}>
					<img src='/assets/logo.png' alt='logo' style={imageStyle} />
					Reactivities
				</Menu.Item>
				<Menu.Item name='activities' as={NavLink} to='/activities' />
				<Menu.Item>
					<Button
						as={NavLink}
						to='/new-activity'
						positive={true}
						content='Create Activity'
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

const imageStyle: CSSProperties = {
	marginRight: '10px'
};

export default observer(NavBar);

import React, { CSSProperties } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
	openCreateActivityForm: () => void;
}

const NavBar: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
	return (
		<Menu fixed='top' inverted={true}>
			<Container>
				<Menu.Item header={true}>
					<img src='/assets/logo.png' alt='logo' style={imageStyle} />
					Reactivities
				</Menu.Item>
				<Menu.Item name='activities' />
				<Menu.Item>
					<Button
						onClick={props.openCreateActivityForm}
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

export default NavBar;

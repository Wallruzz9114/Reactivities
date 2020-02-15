import React, { CSSProperties, useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

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
						onClick={activityStore.openCreateActivityForm}
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

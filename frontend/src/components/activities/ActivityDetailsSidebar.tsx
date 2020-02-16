import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CustomStyles } from '../../styles/CustomStyles';

const ActivityDetailsSidebar = () => {
	return (
		<Fragment>
			<Segment
				textAlign='center'
				style={CustomStyles.BORDER_NONE}
				attached='top'
				secondary={true}
				inverted={true}
				color='teal'
			>
				3 People Going
			</Segment>
			<Segment attached={true}>
				<List relaxed={true} divided={true}>
					<Item style={CustomStyles.POSITION_RELATIVE}>
						<Label
							style={CustomStyles.POSITION_ABSOLUTE}
							color='orange'
							ribbon='right'
						>
							Host
						</Label>
						<Image size='tiny' src={'/assets/user.png'} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={`#`}>Bob</Link>
							</Item.Header>
							<Item.Extra style={CustomStyles.COLOR_ORANGE}>
								Following
							</Item.Extra>
						</Item.Content>
					</Item>

					<Item style={{ position: 'relative' }}>
						<Image size='tiny' src={'/assets/user.png'} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={`#`}>Tom</Link>
							</Item.Header>
							<Item.Extra style={CustomStyles.COLOR_ORANGE}>
								Following
							</Item.Extra>
						</Item.Content>
					</Item>

					<Item style={CustomStyles.POSITION_RELATIVE}>
						<Image size='tiny' src={'/assets/user.png'} />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={`#`}>Sally</Link>
							</Item.Header>
						</Item.Content>
					</Item>
				</List>
			</Segment>
		</Fragment>
	);
};

export default ActivityDetailsSidebar;

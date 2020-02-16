import React from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { CustomStyles } from '../../styles/CustomStyles';
import { IActivity } from '../../models/IActivity';
import { observer } from 'mobx-react-lite';

interface IProps {
	activity: IActivity | undefined;
}

const ActivityDetailsHeader: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	return (
		<Segment.Group>
			<Segment basic={true} attached='top' style={CustomStyles.NO_PADDING}>
				<Image
					src={`/assets/${props.activity?.category}.jpg`}
					fluid={true}
					style={CustomStyles.ACTIVITY_ITEM_IMAGE_STYLE}
				/>
				<Segment
					basic={true}
					style={CustomStyles.ACTIVITY_ITEM_IMAGE_TEXT_STYLE}
				>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={props.activity?.title}
									style={CustomStyles.COLOR_WHITE}
								/>
								<p>{props.activity?.date}</p>
								<p>
									Hosted by <strong>Bob</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing={true} attached='bottom'>
				<Button color='teal'>Join Activity</Button>
				<Button>Cancel attendance</Button>
				<Button color='orange' floated='right'>
					Manage Event
				</Button>
			</Segment>
		</Segment.Group>
	);
};

export default observer(ActivityDetailsHeader);

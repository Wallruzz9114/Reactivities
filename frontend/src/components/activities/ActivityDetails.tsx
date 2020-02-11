import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';

interface IProps {
	activity: IActivity | null;
	setEditMode: (editMode: boolean) => void;
	setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	return (
		<Card fluid={true}>
			<Image
				src={`/assets/${props.activity?.category}.jpg`}
				wrapped={true}
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{props.activity?.title}</Card.Header>
				<Card.Meta>
					<span>{props.activity?.date}</span>
				</Card.Meta>
				<Card.Description>{props.activity?.description}</Card.Description>
			</Card.Content>
			<Card.Content extra={true}>
				<Button.Group widths={2}>
					<Button
						onClick={() => props.setEditMode(true)}
						basic={true}
						color='blue'
						content='Edit'
					/>
					<Button
						onClick={() => props.setSelectedActivity(null)}
						basic={true}
						color='orange'
						content='Cancel'
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default ActivityDetails;

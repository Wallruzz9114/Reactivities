import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';
import { v4 as uuid } from 'uuid';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	selectedActivity: IActivity | null;
	createActivity: (newActivity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	submitting: boolean;
}

const ActivityForm: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	const initializeForm: () =>
		| IActivity
		| {
				id: string;
				title: string;
				category: string;
				description: string;
				date: string;
				city: string;
				venue: string;
		  } = () => {
		return props.selectedActivity != null
			? props.selectedActivity
			: {
					id: '',
					title: '',
					category: '',
					description: '',
					date: '',
					city: '',
					venue: ''
			  };
	};

	const [activity, setActivity] = useState<IActivity>(initializeForm);

	const handleInputChange: (
		event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void = (event: any) => {
		const { name, value } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const handleSubmit: () => void = () => {
		if (activity.id.length === 0) {
			const newActivity = {
				...activity,
				id: uuid()
			};

			props.createActivity(newActivity);
		} else {
			props.editActivity(activity);
		}
	};

	return (
		<Segment clearing={true}>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='title'
					placeholder='Title'
					value={activity.title}
				/>
				<Form.TextArea
					onChange={handleInputChange}
					name='description'
					rows={2}
					placeholder='Description'
					value={activity.description}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='category'
					placeholder='Categpry'
					value={activity.category}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='date'
					type='datetime-local'
					placeholder='Date'
					value={activity.date}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='city'
					placeholder='City'
					value={activity.city}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='venue'
					placeholder='Venue'
					value={activity.venue}
				/>
				<Button
					floated='right'
					loading={props.submitting}
					positive={true}
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={() => props.setEditMode(false)}
					floated='right'
					type='button'
					color='orange'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default ActivityForm;

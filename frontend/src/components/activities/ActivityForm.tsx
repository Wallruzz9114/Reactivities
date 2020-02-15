import React, { useState, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';
import { v4 as uuid } from 'uuid';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
	selectedActivity: IActivity | undefined;
}

const ActivityForm: React.FC<IProps> = (
	props: React.PropsWithChildren<IProps>
) => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

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

			activityStore.createActivity(newActivity);
		} else {
			activityStore.editActivity(activity);
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
					loading={activityStore.submitting}
					positive={true}
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={activityStore.cancelEditActivityForm}
					floated='right'
					type='button'
					color='orange'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);

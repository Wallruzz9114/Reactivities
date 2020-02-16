import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { IActivity } from '../../models/IActivity';
import { observer } from 'mobx-react-lite';
import ActivityStore, { MyActivityStore } from '../../stores/ActivityStore';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
	const activityStore: MyActivityStore = useContext(ActivityStore);

	return (
		<Fragment>
			{activityStore.activitiesSortedByDate.map(
				([group, activities]: [string, IActivity[]]) => (
					<Fragment key={group}>
						<Label size='large' color='blue'>
							{group}
						</Label>
						<Item.Group divided={true}>
							{activities.map((activity: IActivity) => (
								<ActivityListItem key={activity.id} activity={activity} />
							))}
						</Item.Group>
					</Fragment>
				)
			)}
		</Fragment>
	);
};

export default observer(ActivityList);

import { IActivity } from './../models/IActivity';
import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { ServiceAgent } from '../services/SeviceAgent';

configure({ enforceActions: 'always' });

export class MyActivityStore {
	@observable activityRegistry = new Map<string, IActivity>();
	@observable selectedActivity: IActivity | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable targetElement = '';

	@computed get activitiesSortedByDate(): IActivity[] {
		return Array.from(this.activityRegistry.values()).sort(
			(firstActivity: IActivity, nextActivity: IActivity) =>
				Date.parse(firstActivity.date) - Date.parse(nextActivity.date)
		);
	}

	// Action to load all activities
	@action loadActivities: () => Promise<void> = async () => {
		this.loadingInitial = true;

		try {
			const activities: IActivity[] = await ServiceAgent.ACTIVITIES.getAllActivities();

			runInAction('Loading Activities', () => {
				activities.forEach((activity: IActivity) => {
					activity.date = activity.date.split('.')[0];
					this.activityRegistry.set(activity.id, activity);
				});

				this.loadingInitial = false;
			});
		} catch (error) {
			runInAction('Load Activities Error', () => {
				this.loadingInitial = false;
			});

			alert(error);
		}
	};

	@action loadActivity: (id: string) => Promise<void> = async (id: string) => {
		let activity: IActivity | undefined = this.getActivity(id);

		if (activity) {
			this.selectedActivity = activity;
		} else {
			this.loadingInitial = true;

			try {
				activity = await ServiceAgent.ACTIVITIES.getOneActivity(id);

				runInAction('Get Ane Activity', () => {
					this.selectedActivity = activity;
					this.loadingInitial = false;
				});
			} catch (error) {
				runInAction('Get one Activity Error', () => {
					this.loadingInitial = false;
				});
				alert(error);
			}
		}
	};

	@action clearActivity = () => {
		this.selectedActivity = undefined;
	};

	getActivity: (id: string) => IActivity | undefined = (id: string) => {
		return this.activityRegistry.get(id);
	};

	@action createActivity: (activity: IActivity) => Promise<void> = async (
		newActivity: IActivity
	) => {
		this.submitting = true;

		try {
			await ServiceAgent.ACTIVITIES.createActivity(newActivity);

			runInAction('Create Activity', () => {
				this.activityRegistry.set(newActivity.id, newActivity);
				this.editMode = false;
				this.submitting = false;
			});
		} catch (error) {
			runInAction('Create Activity Error', () => {
				this.editMode = false;
				this.submitting = false;
			});
			alert(error);
		}
	};

	@action editActivity: (activityToUpdate: IActivity) => Promise<void> = async (
		activityToUpdate: IActivity
	) => {
		this.submitting = true;

		try {
			await ServiceAgent.ACTIVITIES.updateActivity(activityToUpdate);

			runInAction('Edit Activity', () => {
				this.activityRegistry.set(activityToUpdate.id, activityToUpdate);
				this.selectedActivity = activityToUpdate;
				this.editMode = false;
				this.submitting = false;
			});
		} catch (error) {
			runInAction('Edit Activity Error', () => {
				this.submitting = false;
			});

			alert(error);
		}
	};

	@action deleteActivity: (
		id: string,
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => Promise<void> = async (
		id: string,
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		this.submitting = true;
		this.targetElement = event.currentTarget.name;

		try {
			await ServiceAgent.ACTIVITIES.deleteActivity(id);

			runInAction('Delete Activity', () => {
				this.activityRegistry.delete(id);
				this.submitting = false;
				this.targetElement = '';
			});
		} catch (error) {
			runInAction('Delete Activity', () => {
				this.submitting = false;
				this.targetElement = '';
			});

			alert(error);
		}
	};

	@action openCreateActivityForm: () => void = () => {
		runInAction('Open Create Activity', () => {
			this.editMode = true;
			this.selectedActivity = undefined;
		});
	};

	@action openEditActivityForm: (id: string | undefined) => void = (
		id: string | undefined
	) => {
		if (id !== undefined) {
			runInAction('Open Create Activity', () => {
				this.selectedActivity = this.activityRegistry.get(id);
				this.editMode = true;
			});
		}
	};

	@action cancelSelectedActivity: () => void = () => {
		this.selectedActivity = undefined;
	};

	@action cancelEditActivityForm: () => void = () => {
		this.editMode = false;
	};

	@action selectActivity: (id: string) => void = (id: string) => {
		this.selectedActivity = this.activityRegistry.get(id);
		this.editMode = false;
	};
}

const ActivityStore: React.Context<MyActivityStore> = createContext(
	new MyActivityStore()
);

export default ActivityStore;

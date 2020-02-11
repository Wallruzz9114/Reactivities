import { IActivity } from './../models/IActivity';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) => (response: AxiosResponse) =>
	new Promise<AxiosResponse>(
		(
			resolve: (
				value?: AxiosResponse<any> | PromiseLike<AxiosResponse<any>> | undefined
			) => void
		) => setTimeout(() => resolve(response), ms)
	);

export abstract class ServiceAgent {
	static readonly REQUESTS = {
		get: (url: string) =>
			axios
				.get(url)
				.then(sleep(1000))
				.then(responseBody),
		post: (url: string, body: {}) =>
			axios
				.post(url, body)
				.then(sleep(1000))
				.then(responseBody),
		put: (url: string, body: {}) =>
			axios
				.put(url, body)
				.then(sleep(1000))
				.then(responseBody),
		delete: (url: string) =>
			axios
				.delete(url)
				.then(sleep(1000))
				.then(responseBody)
	};
	static readonly ACTIVITIES = {
		getAllActivities: (): Promise<IActivity[]> =>
			ServiceAgent.REQUESTS.get('/activities'),
		getOneActivity: (id: string) =>
			ServiceAgent.REQUESTS.get(`/activities/${id}`),
		createActivity: (activity: IActivity) =>
			ServiceAgent.REQUESTS.post('/activities', activity),
		updateActivity: (activity: IActivity) =>
			ServiceAgent.REQUESTS.put(`/activities/${activity.id}`, activity),
		deleteActivity: (id: string) =>
			ServiceAgent.REQUESTS.delete(`/activities/${id}`)
	};
}

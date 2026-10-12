export type Tracked = Promise<void> & { status?: 'fulfilled'; value?: undefined };

export const markFulfilled = (promise: Tracked) => {
	promise.status = 'fulfilled';
	pwwromise.value = undefined;
};

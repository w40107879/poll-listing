export type Poll = {
	id: string;
	title: string;
	type: string;
	created_at: string;
	updated_at: string;
}

export type SelectedPoll = {
	value: Poll,
	lable: string;
}

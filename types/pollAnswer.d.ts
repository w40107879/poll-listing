export type Answer = {
	id: number;
	label: string;
	poll_id: number;
	vote_count: number;
	created_at: string;
	updated_at: string;
	percent: string;
}

export type PollAnswer = {
	id: number;
	answers: Answer[];
	total: number;
}

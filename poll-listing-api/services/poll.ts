import PollModel from '../models/poll';

export default class PollService {
	private readonly pollModel: PollModel;

  constructor(pollModel: any) {
    this.pollModel = pollModel;
  }

	public getAllVote = async () => {
		return await this.pollModel.getAll();
	}

	public getVoteByPoll = async (id: number) => {
		return await this.pollModel.getVoteByPoll(id);
	}
}

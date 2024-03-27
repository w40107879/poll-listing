import { injectable, inject } from 'inversify';
import PollModel from '../models/poll';

@injectable()
export default class PollService {
	private readonly pollModel: PollModel;

  constructor(@inject(PollModel) pollModel: PollModel) {
    this.pollModel = pollModel;
  }

	public getAllVote = async () => {
		return await this.pollModel.getAll();
	}

	public getVoteByPoll = async (id: number) => {
		return await this.pollModel.getVoteByPoll(id);
	}
}

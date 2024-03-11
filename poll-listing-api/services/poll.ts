import PollModel from '../models/poll';

export default class PollService {
	private readonly pollModel: PollModel;

  constructor(pollModel: any) {
    this.pollModel = pollModel;
  }

	public getAllVote = async () => {
		console.log(123);
		return this.pollModel.getAll();
	}

}

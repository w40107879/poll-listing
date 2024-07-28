import AnswerModel from '../models/answer';

export default class AnswerService {
	private readonly answerModel: AnswerModel;

  constructor(answerModel: any) {
    this.answerModel = answerModel;
  }

	public increaseVotes = async (ids: number[]) => {
		return await this.answerModel.increaseVotes(ids);
	}
}

import AnswerModel from '../models/answer';

export default class AnswerService {
	private readonly answerModel: AnswerModel;

  constructor(answerModel: any) {
    this.answerModel = answerModel;
  }

	public increaseVote = async (id: number) => {
		return await this.answerModel.increaseVote(id);
	}
}

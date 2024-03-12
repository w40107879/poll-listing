import { Example, Route, Get, Controller, Path } from 'tsoa';
import PollService from '../services/poll'
import PollModel from '../models/poll';
@Route('poll')
export class PollController extends Controller {
  private pollModel: PollModel
  private pollService: PollService
  constructor() {
    super();
    this.pollModel = new PollModel();
    this.pollService = new PollService(this.pollModel);
  }

  @Get('/')
  @Example({
    code: 200,
  })
  public async getAllPolls() {
    return await this.pollService.getAllVote();
  }

  @Get("/:id")
  @Example({
    code: 200,
  })
  public async getVotesByPollId(@Path() id: number) {
    const data = await this.pollService.getVoteByPoll(id);
    const answers = data?.answer || []
    const total = answers.reduce((acc, answer) => acc + answer.vote_count, 0);
    const calculatePercent = (voteCount: number) =>
    total ? ((voteCount / total) * 100).toFixed(2) + '%' : '0%';
    const newAnswers = answers.map(answer => ({
      ...answer,
      percent: calculatePercent(answer.vote_count)
    }));

    return {
      id,
      answers: newAnswers,
      total
    }
  }
}

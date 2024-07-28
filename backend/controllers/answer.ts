import { Example, Route, Post, Controller, Body } from 'tsoa';
import AnswerModel from '../models/answer';
import AnswerService from '../services/answer';

@Route('answer')
export class AnswerController extends Controller {
  private answerModel: AnswerModel;

  private answerService: AnswerService;

  constructor() {
    super();
    this.answerModel = new AnswerModel();
    this.answerService = new AnswerService(this.answerModel);
  }

  @Post('/')
  @Example({
    code: 200,
  })
  public async vote(@Body() body: any) {
    const { ids } = body;
    return this.answerService.increaseVote(ids);
  }
}

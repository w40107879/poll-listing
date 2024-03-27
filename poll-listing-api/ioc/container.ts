import { Container } from 'inversify';
import PollModel from '../models/poll';

const container = new Container();

container.bind<PollModel>(PollModel).toSelf();


export { container };

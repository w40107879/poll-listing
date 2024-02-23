import express from 'express';
import { getAllPolls, getVotesByPollId, createVotes } from './controller/poll';

const router = express.Router();

router.get('/polls', getAllPolls);
router.get('/poll/vote/:id', getVotesByPollId);
router.post('/poll/:id', createVotes);

export default router;

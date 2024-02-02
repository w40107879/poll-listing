const {
	getVotesByPollId,
	getPollsWithVotes,
	createVotes
} = require('./controller/poll');

const router = require('express').Router();

router.get('/poll/vote/:id', getVotesByPollId);
router.get('/polls/votes', getPollsWithVotes);
router.post('/poll/:id', createVotes);

module.exports = router;

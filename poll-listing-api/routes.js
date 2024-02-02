const {
	getVotesByPollId,
	createVotes
} = require('./controller/poll');

const router = require('express').Router();

router.get('/poll/vote/:id', getVotesByPollId);
router.post('/poll/:id', createVotes);

module.exports = router;

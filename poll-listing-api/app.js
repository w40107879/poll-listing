const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pollsData = require('./db/polls.json');
const votesData = require('./db/polls-vote.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get all polls
app.get('/api/polls', (req, res) => {
  res.json(pollsData);
});

app.get('/api/polls/votes', (req, res) => {
  const polls = pollsData.polls;
  const votes = votesData.votes;

  // Create an object to store poll votes
  const pollVotes = votes.reduce((acc, vote) => {
    const { polls_id, answers_id } = vote;
    acc[polls_id] = acc[polls_id] || {};
    acc[polls_id][answers_id] = (acc[polls_id][answers_id] || 0) + 1;
    return acc;
  }, {});

  // Map poll data with votes
  const pollsWithVotes = polls.map(poll => {
    const { id, title, answer } = poll;
    const options = answer.options.map(option => {
      const count = pollVotes[id] ? pollVotes[id][option.id] || 0 : 0;
      const total = pollVotes[id] ? Object.values(pollVotes[id]).reduce((acc, curr) => acc + curr, 0) : 0;
      const percent = total ? ((count / total) * 100).toFixed(2) : 0;
      return {
        label: option.label,
        count,
        percent
      };
    });
    const total = options.reduce((acc, curr) => acc + curr.count, 0);
    return {
      id,
      title,
      answer: options,
      total
    };
  });

  res.json(pollsWithVotes);
});


// Endpoint to submit poll results
app.post('/api/poll/:id', (req, res) => {
  const { id } = req.params;
  const { option } = req.body;
  // Update poll results in the database
  // For simplicity, we'll just log the selected option
  console.log(`Poll ${id} - Option selected: ${option}`);
  res.status(200).send('Poll submitted successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

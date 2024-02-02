const pollsData = require('../db/polls.json');
const votesData = require('../db/polls-vote.json');
const fs = require('fs');
const path = require('path');

const getVotesByPollId = (req, res) => {
  const { id } = req.params;

  // Find the poll with the specified id
  const poll = pollsData.polls.find(poll => poll.id === parseInt(id));

  if (!poll) {
    return res.status(404).json({ error: 'Poll not found' });
  }

  // Filter votes for the specific poll
  const pollVotes = votesData.votes.filter(vote => vote.polls_id === parseInt(id));

  // Count votes for each option
  const optionCounts = {};
  pollVotes.forEach(vote => {
    optionCounts[vote.answers_id] = (optionCounts[vote.answers_id] || 0) + 1;
  });

  // Calculate total votes
  const total = Object.values(optionCounts).reduce((acc, count) => acc + count, 0);

  // Calculate percentages for each option
  const options = poll.answer.options.map(option => ({
    id: option.id,
    label: option.label,
    count: optionCounts[option.id] || 0,
    percent: total ? ((optionCounts[option.id] || 0) / total * 100).toFixed(2) + '%' : '0%',
  }));

  res.json({
    id: poll.id,
    answer: options,
    total,
  });
}

const getPollsWithVotes = (req, res) => {
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
        id: option.id,
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
}

const createVotes = (req, res) => {
  const { id } = req.params;
  const { option } = req.body;

	const filePath = path.resolve(__dirname, "../db/polls-vote.json");
  // Read the existing JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Parse the JSON data
    const votes = JSON.parse(data);

    // Add the new vote to the votes array
    votes.votes.push({
      id: votes.votes.length + 1, // Assign a new ID (you might want to improve this logic)
      polls_id: parseInt(id),
      answers_id: parseInt(option)
    });

    // Convert the votes object back to JSON
    const updatedData = JSON.stringify(votes, null, 2); // 2 spaces for indentation

    // Write the updated JSON data back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
      }

      console.log('Vote added successfully:', { id, option });
      res.status(200).send('Poll submitted successfully');
    });
  });
}

module.exports = {
	getVotesByPollId,
	getPollsWithVotes,
	createVotes
}

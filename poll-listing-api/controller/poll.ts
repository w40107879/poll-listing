import { polls } from '../db/polls.json';
import { votes as _votes } from '../db/polls-vote.json';
import { readFile, writeFile } from 'fs';
import { resolve } from 'path';

export const getAllPolls = (req: any, res: any) => {
  res.json(polls);
}

export const getVotesByPollId = (req: any, res: any) => {
  const { id } = req.params;

  // Find the poll with the specified id
  const poll = polls.find(poll => poll.id === parseInt(id));

  if (!poll) {
    return res.status(404).json({ error: 'Poll not found' });
  }

  // Filter votes for the specific poll
  const pollVotes = _votes.filter(vote => vote.polls_id === parseInt(id));

  // Count votes for each option using reduce
  const optionCounts = pollVotes.reduce<Record<number, number>>((counts, vote) => {
    counts[vote.answers_id] = (counts[vote.answers_id] || 0) + 1;
    return counts;
  }, {});

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

export const createVotes = (req: any, res: any) => {
  const { id } = req.params;
  const { option } = req.body;

	const filePath = resolve(__dirname, "../db/polls-vote.json");
  // Read the existing JSON file
  readFile(filePath, 'utf8', (err, data) => {
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
    writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
      }

      console.log('Vote added successfully:', { id, option });
      res.status(200).send('Poll submitted successfully');
    });
  });
}

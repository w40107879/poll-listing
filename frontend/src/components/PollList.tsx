import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { fetchVotes, saveVote } from '../api/api';
import PollForm from './PollForm';
import PollPieChart from './PollPieChart';
import { PollAnswer } from '@root/types/pollAnswer'
import { Poll } from '@root/types/poll';

interface Props {
  poll: Poll;
}

export default function PollList({ poll }: Props) {
  const [vote, setVote] = useState<PollAnswer>({
    id: 1,
    answers: [],
    total: 0
});

  useEffect(() => {
    getVotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll]);

  const getVotes = async () => {
    try {
      if (poll.id) {
        const votes = await fetchVotes(poll.id)
        setVote(votes);
      }
    } catch (error) {
      console.error('Error fetching poll votes:', error);
    }
  };

  const handlePollSubmit = async (e: React.FormEvent<HTMLFormElement>, pollId: string) => {
    try {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const selectedOption = form.querySelector<HTMLInputElement>(`[name="poll_${pollId}"]`)?.value;
      if (!selectedOption) return;
      await saveVote(Number(selectedOption))
      await getVotes();
    } catch (e) {
      console.error('Error submitting poll:', e);
    }
  };

  return (
    <div>
      <div key={poll.id}>
        {vote.id && (
          <>
          <List>
            {vote.answers.map(answer => (
              <ListItem key={answer.id}>
                <ListItemText
                  primary={`${answer.label}: ${answer.vote_count}`}
                  secondary={`(${answer.percent})`}
                />
              </ListItem>
            ))}
          </List>
            <h4>Total: {vote.total}</h4>
            <PollForm
              answers={vote.answers}
              type={poll.type}
              pollId={poll.id}
              handlePollSubmit={handlePollSubmit}
            />
            <PollPieChart vote={vote}/>
          </>
        )}
      </div>
    </div>
  );
}

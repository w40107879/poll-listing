import { useState, useEffect, useCallback, FC } from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { PollAnswer } from '@root/types/pollAnswer';
import { Poll } from '@root/types/poll';
import { fetchVotes, saveVote } from '../api/api';
import PollForm from './PollForm';
import PollPieChart from './PollPieChart';

interface Props {
  poll: Poll;
}

const PollList: FC<Props> = ({ poll }) => {
  const [vote, setVote] = useState<PollAnswer>({
    id: 1,
    answers: [],
    total: 0,
  });

  const getVotes = useCallback(async () => {
    try {
      if (poll.id) {
        const votes = await fetchVotes(poll.id);
        setVote(votes);
      }
    } catch (error) {
      console.error('Error fetching poll votes:', error);
    }
  }, [poll.id]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

  const handlePollSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    selectedAnswers: string[],
  ) => {
    e.preventDefault();
    if (selectedAnswers.length === 0) return;
    try {
      await saveVote(selectedAnswers.map(Number));
      await getVotes();
    } catch (error) {
      console.error('Error submitting poll:', error);
    }
  };

  return (
    <div>
      <div key={poll.id}>
        <PollForm
          answers={vote.answers}
          type={poll.type}
          pollId={poll.id}
          handlePollSubmit={handlePollSubmit}
        />
        {vote.id && (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <List>
                {vote.answers.map((answer) => (
                  <ListItem key={answer.id}>
                    <ListItemText
                      primary={`${answer.label}: ${answer.vote_count}`}
                      secondary={`(${answer.percent})`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h4" gutterBottom>
                Total: {vote.total}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <PollPieChart vote={vote} />
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default PollList;

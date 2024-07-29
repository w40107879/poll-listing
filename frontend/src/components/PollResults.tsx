import { FC } from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { PollAnswer } from '@root/types/pollAnswer';
import PollPieChart from './PollPieChart';

interface PollResultsProps {
  vote: PollAnswer;
}

const PollResults: FC<PollResultsProps> = ({ vote }) => (
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
);

export default PollResults;

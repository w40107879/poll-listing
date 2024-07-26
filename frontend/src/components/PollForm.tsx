import React, { FC } from 'react';
import { Answer } from '@root/types/pollAnswer';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
  Box,
  Paper,
  Typography,
} from '@mui/material';

interface Props {
  answers: Answer[];
  type: string;
  pollId: string;
  handlePollSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    pollId: string,
  ) => Promise<void>;
}

const PollForm: FC<Props> = ({ answers, type, pollId, handlePollSubmit }) => {
  return (
    <Box my={4} mx={2}>
      <Paper elevation={3} style={{ padding: 16 }}>
        <form onSubmit={(e) => handlePollSubmit(e, pollId)}>
          <Typography variant="h6" gutterBottom>
            Poll Question
          </Typography>
          <FormControl component="fieldset" fullWidth>
            {type === 'Single' ? (
              <RadioGroup name={`poll_${pollId}`}>
                {answers.map((answer) => (
                  <FormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={<Radio />}
                    label={answer.label}
                  />
                ))}
              </RadioGroup>
            ) : (
              <FormGroup>
                {answers.map((answer) => (
                  <FormControlLabel
                    key={answer.id}
                    control={
                      <Checkbox name={`poll_${pollId}`} value={answer.id} />
                    }
                    label={answer.label}
                  />
                ))}
              </FormGroup>
            )}
          </FormControl>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Vote
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PollForm;

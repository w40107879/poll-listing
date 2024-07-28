import React, { FC, useState } from 'react';
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
  FormHelperText,
  FormLabel,
} from '@mui/material';

interface Props {
  answers: Answer[];
  type: string;
  pollId: string;
  handlePollSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    selectedAnswers: string[],
  ) => Promise<void>;
}

const PollForm: FC<Props> = ({ answers, type, pollId, handlePollSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (type === 'Single') {
      setSelectedAnswers([value]);
    } else {
      setSelectedAnswers((prev) =>
        prev.includes(value)
          ? prev.filter((id) => id !== value)
          : [...prev, value],
      );
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePollSubmit(e, selectedAnswers);
  };

  return (
    <Box my={4} mx={2}>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Poll Question
          </Typography>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend">Select an option</FormLabel>
            {type === 'Single' ? (
              <RadioGroup name={`poll_${pollId}`} onChange={handleChange}>
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
                      <Checkbox
                        name={`poll_${pollId}`}
                        value={answer.id}
                        onChange={handleChange}
                      />
                    }
                    label={answer.label}
                  />
                ))}
              </FormGroup>
            )}
            <FormHelperText>Choose wisely</FormHelperText>
          </FormControl>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Vote
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PollForm;

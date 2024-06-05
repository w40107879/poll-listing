import { Answer } from '@root/types/pollAnswer'
import { FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, FormLabel, FormGroup } from '@mui/material';

interface Props {
  answers: Answer[];
  type: string;
  pollId: string;
  handlePollSubmit: (e: React.FormEvent<HTMLFormElement>, pollId: string) => Promise<void>
}

export default function PollForm({ answers, type, pollId, handlePollSubmit }: Props) {
  return (
    <form onSubmit={(e) => handlePollSubmit(e, pollId)}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Answer</FormLabel>
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
                control={<Checkbox name={`poll_${pollId}`} value={answer.id} />}
                label={answer.label}
              />
            ))}
          </FormGroup>
        )}
      </FormControl>
      <button type="submit">Vote</button>
    </form>
  );
}

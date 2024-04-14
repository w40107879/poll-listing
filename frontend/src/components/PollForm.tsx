import { Answer } from '@root/types/pollAnswer'

interface Props {
  answers: Answer[];
  type: string;
  pollId: string;
  handlePollSubmit: (e: React.FormEvent<HTMLFormElement>, pollId: string) => Promise<void>
}

export default function PollForm({ answers, type, pollId, handlePollSubmit }: Props) {
  return (
    <form onSubmit={(e) => handlePollSubmit(e, pollId)}>
      {answers.map((answer) => (
        <div key={answer.id}>
          <label>
            <input type={type === 'Single' ? 'radio' : 'checkbox'} name={`poll_${pollId}`} value={answer.id} />
            {answer.label}
          </label>
        </div>
      ))}
      <button type="submit">Vote</button>
    </form>
  );
}

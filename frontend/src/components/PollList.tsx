import { useState, useEffect } from 'react';
import axios from 'axios';
import PollForm from './PollForm';
import PollPieChart from './PollPieChart';
import { PollAnswer, Answer } from '@root/types/pollAnswer'
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
    fetchVote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll]);

  const fetchVote = async () => {
    try {
      if (poll.id) {
        const response = await axios.get(`http://localhost:5000/api/poll/${poll.id}`);
        setVote(response.data);
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
      await axios.post(`http://localhost:5000/api/answer`, { id: Number(selectedOption) });
      await fetchVote();
    } catch (e) {
      console.error('Error submitting poll:', e);
    }
  };

  return (
    <div>
      <div key={poll.id}>
        {vote.id && (
          <>
            <ul>
              {vote.answers.map((answer: Answer) => (
                <li key={answer.id}>
                  {answer.label}: {answer.vote_count} ({answer.percent})
                </li>
              ))}
            </ul>
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

import { useState, useEffect, useCallback, FC } from 'react';
import { PollAnswer } from '@root/types/pollAnswer';
import { Poll } from '@root/types/poll';
import { fetchVotes, saveVote } from '../api/api';
import PollForm from './PollForm';
import PollResults from './PollResults';

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
        {vote.id && <PollResults vote={vote} />}
      </div>
    </div>
  );
};

export default PollList;

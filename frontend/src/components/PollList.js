import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollForm from './PollForm';
import PollPieChart from './PollPieChart';

export default function PollList({ poll }) {
  const [vote, setVote] = useState({});

  useEffect(() => {
    fetchVote();
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

  const handlePollSubmit = async (e, pollId) => {
    try {
      e.preventDefault();
      const selectedOption = e.target.elements[`poll_${pollId}`].value;
      if (selectedOption === '') return;
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
              {vote.answers.map(answer => (
                <li key={answer.id}>
                  {answer.label}: {answer.count} ({answer.percent})
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

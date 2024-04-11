import React from 'react';

export default function PollForm({ answers, type, pollId, handlePollSubmit }) {
  return (
    <form onSubmit={(e) => handlePollSubmit(e, pollId)}>
      {answers.map(answer => (
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

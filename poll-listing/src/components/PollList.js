// PollList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

export default function PollList({ poll, handlePollSubmit }) {
  const [vote, setVote] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/poll/vote/${poll.id}`)
      .then(response => {
        console.log(response.data);
        setVote(response.data);
      })
      .catch(error => {
        console.error('Error fetching poll votes:', error);
      });
  }, [poll]);

  return (
    <div>
        <div key={poll.id}>
          <h3>{poll.title}</h3>
          {vote.id && (
          <>
            <ul>
              {vote.answer.map(option => (
                <li key={option.id}>
                  {option.label}: {option.count} ({option.percent})
                </li>
              ))}
            </ul>
            <Pie
              data={{
                labels: vote.answer.map(option => option.label),
                datasets: [{
                  data: vote.answer.map(option => option.count),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                  ],
                }],
              }}
              options={{
                title: {
                  display: true,
                  text: 'Poll Results',
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: 'right',
                },
              }}
              />
            </>
          )}
        </div>
    </div>
  );
}

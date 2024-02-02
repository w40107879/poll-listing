// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollList from './components/PollList';

function App() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/polls')
      .then(response => {
        setPolls(response.data.polls);
      })
      .catch(error => {
        console.error('Error fetching polls:', error);
      });
  }, []);

  const handlePollSubmit = (e, pollId) => {
    e.preventDefault();
    const selectedOption = e.target.elements[`poll_${pollId}`].value;
    axios.post(`http://localhost:5000/api/poll/${pollId}`, { option: selectedOption })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error submitting poll:', error);
      });
  };

  return (
    <div className="App">
      <PollList polls={polls} handlePollSubmit={handlePollSubmit} />
    </div>
  );
}

export default App;

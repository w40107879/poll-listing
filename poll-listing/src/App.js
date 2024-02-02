// App.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios';
import PollList from './components/PollList';

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPoll, setSelectedPoll] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/polls')
      .then(response => {
        const polls = response.data.polls;
        const newOptions = polls.map((poll) => ({
          value: poll,
          label: poll.title
        }));
        setOptions(newOptions);
        setSelectedPoll(newOptions[0].value);
        setSelectedOption(newOptions[0]);
      })
      .catch(error => {
        console.error('Error fetching polls:', error);
      });
  }, []);


  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    setSelectedPoll(selectedOption.value);
  };

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
      <h2>Polls List</h2>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      <PollList poll={selectedPoll} handlePollSubmit={handlePollSubmit} />
    </div>
  );
}

export default App;

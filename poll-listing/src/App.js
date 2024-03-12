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
    axios.get('http://localhost:5000/api/poll')
      .then(response => {
        const polls = response.data;
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

  return (
    <div className="App">
      <h2>Polls List</h2>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      <PollList poll={selectedPoll}/>
    </div>
  );
}

export default App;

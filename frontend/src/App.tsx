import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchPolls } from './api/api';
import PollList from './components/PollList';
import { Poll } from '@root/types/poll';

const defaultPoll: Poll = {
  id: '',
  title: '',
  type: '',
  created_at: '',
  updated_at: ''
};

function App() {
  const [options, setOptions] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll>(defaultPoll);

  const getPolls = async () => {
    try {
      const polls = await fetchPolls();
      setOptions(polls);
      if (polls.length > 0) {
        setSelectedPoll(polls[0]);
      }
    } catch (error) {
      console.error('Failed to fetch polls:', error);
    }
  };

  useEffect(() => {
    getPolls();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedOption = options.find(option => option.id === selectedId) || null;
    if (selectedOption) {
      setSelectedPoll(selectedOption);
    }
  };


  return (
    <div className="App">
      <h2>Polls List</h2>
      <FormControl fullWidth>
        <InputLabel id="poll-select-label">Select Poll</InputLabel>
        <Select
          labelId="poll-select-label"
          value={selectedPoll?.id || ''}
          onChange={handleChange}
          label="Select Poll"
        >
          {options.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PollList poll={selectedPoll} />
    </div>
  );
}

export default App;

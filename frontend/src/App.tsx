import { useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios';
import PollList from './components/PollList';
import { Poll, SelectedPoll } from '@root/types/poll';

function App() {
  const initialPollState: Poll = { id: '', title: '', type: '', created_at: '', updated_at: '' };
  const [options, setOptions] = useState<SelectedPoll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll>(initialPollState);
  const [selectedOption, setSelectedOption] = useState<SelectedPoll>();

  useEffect(() => {
    axios.get('http://localhost:5000/api/poll')
      .then((response) => {
        const { data: polls } = response;
        const newOptions: SelectedPoll[] = polls.map((poll: Poll) => ({
          value: poll,
          label: poll.title
        }));
        setOptions(newOptions);
        setSelectedPoll(newOptions[0].value);
        setSelectedOption(newOptions[0]);
      })
      .catch((error: Error) => {
        console.log(error)
      });
  }, []);


  const handleChange = (selectedOption: SelectedPoll | null) => {
    if (selectedOption !== null) {
      setSelectedOption(selectedOption);
      setSelectedPoll(selectedOption.value);
    }
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

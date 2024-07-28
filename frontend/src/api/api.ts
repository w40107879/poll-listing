import axios from 'axios';
import { Poll } from '@root/types/poll';
import { PollAnswer } from '@root/types/pollAnswer';

export const fetchPolls = async (): Promise<Poll[]> => {
  const response = await axios.get('http://localhost:5000/api/poll');
  return response.data;
};

export const fetchVotes = async (id: string): Promise<PollAnswer> => {
  const response = await axios.get(`http://localhost:5000/api/poll/${id}`);
  return response.data;
};

export const saveVote = async (ids: number[]) => {
  await axios.post(`http://localhost:5000/api/answer`, { ids });
};

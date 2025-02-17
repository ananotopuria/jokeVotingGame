import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const getJoke = async () => {
  const response = await axios.get(`${API_URL}/joke`); 
  return response.data;
};

export const voteJoke = async (jokeId: string, emoji: string) => {
  const response = await axios.post(`${API_URL}/joke/${jokeId}`, { label: emoji });
  return response.data;
};
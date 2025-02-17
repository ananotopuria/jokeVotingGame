"use client";

import { useState, useEffect } from "react";
import { getJoke, voteJoke } from "../lib/api";

interface Joke {
  _id: string;
  question: string;
  answer: string;
  votes: { value: number; label: string }[];
  availableVotes: string[];
}

const JokeCard = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const data = await getJoke();
      setJoke(data);
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (emoji: string) => {
    if (!joke) return;
    try {
      const updatedJoke = await voteJoke(joke._id, emoji);
      setJoke(updatedJoke);
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {joke && (
        <>
          <h2>{joke.question}</h2>
          <p>{joke.answer}</p>
          <div>
            {joke.availableVotes.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleVote(emoji)}
              >
                {emoji} ({joke.votes.find(v => v.label === emoji)?.value || 0})
              </button>
            ))}
          </div>
          <button onClick={fetchJoke}>
            Next Joke
          </button>
        </>
      )}
    </div>
  );
};

export default JokeCard;

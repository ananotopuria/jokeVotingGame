"use client";

import { useState, useEffect, useCallback } from "react";
import { getJoke, voteJoke } from "../lib/api";
import Image from "next/image";
import { motion } from "framer-motion";
import VotingButtons from "./VotingButtons";

interface Joke {
  _id: string;
  question: string;
  answer: string;
  votes: { value: number; label: string }[];
  availableVotes: string[];
}

const JokeCard = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    setShowAnswer(false);
    try {
      const data = await getJoke();
      setJoke(data);
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  const handleVote = async (emoji: string) => {
    if (!joke) return;

    const updatedVotes = joke.votes.map((v) =>
      v.label === emoji ? { ...v, value: v.value + 1 } : v
    );

    setJoke({ ...joke, votes: updatedVotes });

    try {
      const updatedJoke = await voteJoke(joke._id, emoji);
      setJoke(updatedJoke);
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const buttonMotionProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

  return (
    <div className="p-6 lg:p-10 flex flex-col justify-center text-center mx-auto bg-[#f91d1d] shadow-lg border-4 border-dotted w-[50rem] h-[50rem]">
      {loading ? (
        <p className="text-[#fffbde] font-smokum">Wait For IT... 🥁</p>
      ) : joke ? (
        <>
          <h2 className="text-2xl lg:text-4xl font-bold mb-3 text-[#fffbde] font-rye">
            🎪 {joke.question}
          </h2>
          {!showAnswer ? (
            <motion.button
              className="px-4 py-2 text-2xl text-[#fffbde] rounded-lg font-smokum mb-6"
              onClick={() => setShowAnswer(true)}
              {...buttonMotionProps}
            >
              🪄 🎩 Show Answer 🐇
            </motion.button>
          ) : (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="spotlight-7833277_960_720.png"
                alt="Next Joke"
                width={300}
                height={160}
                className="mt-4"
              />
              <p className="text-[#f4f4f8] text-xl lg:text-2xl mt-3 font-smokum mb-6">
                {joke.answer}
              </p>
            </motion.div>
          )}
          <VotingButtons joke={joke} handleVote={handleVote} />
          <motion.button
            onClick={fetchJoke}
            {...buttonMotionProps}
            className="mt-10 cursor-pointer flex justify-center"
          >
            <Image src="joke.png" alt="Next Joke" width={160} height={120} />
          </motion.button>
        </>
      ) : (
        <p className="text-[#fffbde] font-smokum">No joke found 🍿</p>
      )}
    </div>
  );
};

export default JokeCard;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useVotes } from "@/context/VoteContext";

const circusColors = ["#FF4136", "#FFDC00", "#0074D9", "#FF851B", "#2ECC40"];

const VotingButtons = ({ joke, handleVote }) => {
  const { votes, addVote } = useVotes();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(
      joke.availableVotes.map(
        () => circusColors[Math.floor(Math.random() * circusColors.length)]
      )
    );
  }, [joke]);

  return (
    <div className="mt-4 flex justify-center gap-4 relative">
      {joke.availableVotes.map((emoji, index) => {
        const voteCount = votes[joke._id]?.[emoji] || 0;
        const color = colors[index];

        return (
          <div key={emoji} className="relative flex flex-col items-center">
            {voteCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                className="absolute top-14 text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full border-2 border-dotted border-[#fffbde] shadow-lg"
              >
                {voteCount}
              </motion.div>
            )}

            <motion.button
              onClick={() => {
                addVote(joke._id, emoji);
                handleVote(emoji);
              }}
              whileHover={{
                scale: 1.1,
                rotate: Math.random() * 10 - 5,
                boxShadow: `0px 0px 12px rgba(255, 255, 255, 0.8)`,
              }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                },
              }}
              className="text-3xl font-bold py-3 px-4 border-2 border-dotted border-[#fffbde] shadow-lg rounded-xl"
              style={{
                backgroundColor: color,
                textShadow: "2px 2px 2px rgba(0,0,0,0.3)",
              }}
            >
              {emoji}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default VotingButtons;

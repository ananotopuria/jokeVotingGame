"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface VoteContextType {
  votes: Record<string, Record<string, number>>;
  addVote: (jokeId: string, emoji: string) => void;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider = ({ children }: { children: ReactNode }) => {
  const [votes, setVotes] = useState<Record<string, Record<string, number>>>(() => {
    if (typeof window !== "undefined") {
      const storedVotes = localStorage.getItem("votes");
      return storedVotes ? JSON.parse(storedVotes) : {};
    }
    return {};
  });

  const addVote = (jokeId: string, emoji: string) => {
    setVotes((prevVotes) => {
      const updatedVotes = {
        ...prevVotes,
        [jokeId]: {
          ...prevVotes[jokeId],
          [emoji]: (prevVotes[jokeId]?.[emoji] || 0) + 1,
        },
      };

      localStorage.setItem("votes", JSON.stringify(updatedVotes));
      return updatedVotes;
    });
  };

  return (
    <VoteContext.Provider value={{ votes, addVote }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVotes = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVotes must be used within a VoteProvider");
  }
  return context;
};

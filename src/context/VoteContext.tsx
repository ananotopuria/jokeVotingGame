"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface VoteContextType {
  votes: Record<string, Record<string, number>>;
  addVote: (jokeId: string, emoji: string) => void;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider = ({ children }: { children: ReactNode }) => {
  const [votes, setVotes] = useState<Record<string, Record<string, number>>>({});

  const addVote = (jokeId: string, emoji: string) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [jokeId]: {
        ...prevVotes[jokeId],
        [emoji]: (prevVotes[jokeId]?.[emoji] || 0) + 1,
      },
    }));
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

import mongoose from "mongoose";

interface Vote {
  value: number;
  label: string;
}

interface Joke extends mongoose.Document {
  id: string;
  question: string;
  answer: string;
  permalink: string;
  votes: Vote[];
  availableVotes: string[];
}

const JokeSchema = new mongoose.Schema<Joke>({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  permalink: { type: String, required: true },
  votes: { type: [{ value: Number, label: String }], default: [] },
  availableVotes: { type: [String], default: ["😂", "👍", "❤️"] },
});

export default mongoose.model<Joke>("Joke", JokeSchema);

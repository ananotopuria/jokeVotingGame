import { Request, Response } from "express";
import axios from "axios";
import Joke from "../models/joke";

export const getRandomJoke = async (_req: Request, res: Response): Promise<void> => {
  try {
    const apiRes = await axios.get("https://teehee.dev/api/joke");
    const { id, question, answer, permalink } = apiRes.data;

    let joke = await Joke.findOne({ id });

    if (!joke) {
      joke = new Joke({ id, question, answer, permalink, votes: [], availableVotes: ["😂", "👍", "❤️"] });
      await joke.save();
    }

    res.json(joke);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error fetching joke", error: error.message });
    } else {
      res.status(500).json({ message: "Error fetching joke", error: String(error) });
    }
  }
};

export const voteJoke = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { label } = req.body;

  try {
    const joke = await Joke.findById(id);
    if (!joke) {
      res.status(404).json({ message: "Joke not found" });
      return;
    }

    const vote = joke.votes.find((v) => v.label === label);
    if (vote) {
      vote.value += 1;
    } else {
      joke.votes.push({ label, value: 1 });
    }

    await joke.save();
    res.json(joke);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const deleteJoke = async (req: Request, res: Response): Promise<void> => {
  try {
    const joke = await Joke.findByIdAndDelete(req.params.id);
    if (!joke) {
      res.status(404).json({ message: "Joke not found" });
      return;
    }

    res.json({ message: "Joke deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

export const updateJoke = async (req: Request, res: Response): Promise<void> => {
  try {
    const joke = await Joke.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!joke) {
      res.status(404).json({ message: "Joke not found" });
      return;
    }

    res.json(joke);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
};

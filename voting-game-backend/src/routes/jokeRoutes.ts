import express from "express";
import { getRandomJoke, voteJoke, deleteJoke, updateJoke } from "../controllers/jokeController";

const router = express.Router();

router.get("/joke", getRandomJoke);
router.post("/joke/:id", voteJoke);
router.delete("/joke/:id", deleteJoke);
router.put("/joke/:id", updateJoke);

export default router;

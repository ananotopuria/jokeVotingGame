import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import jokeRoutes from "./routes/jokeRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", jokeRoutes);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Trying a different port...`);
    const newPort = PORT + 1;
    app.listen(newPort, () => console.log(`🚀 Server running on port ${newPort}`));
  } else {
    console.error("❌ Server error:", error);
  }
});

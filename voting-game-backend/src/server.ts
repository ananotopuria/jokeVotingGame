import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import jokeRoutes from "./routes/jokeRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true 
}));

app.use(express.json());
app.use(express.static('../out'));
app.use(express.static('../public'));

app.use("/api", jokeRoutes);

app.get('*', (req, res) => {
  res.sendFile("index.html", { root: '../out' });
});



const PORT = 5001; 

const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Please stop other processes using this port.`);
    process.exit(1); 
  } else {
    console.error("❌ Server error:", error);
  }
});



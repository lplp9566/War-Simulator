import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


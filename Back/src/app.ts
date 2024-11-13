import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import missiles from "./models/missiles";
import organization, { IOrganization } from "./models/organization";
import users from "./models/users";
import router from "./routes/authRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
connectDB();

// Routes

// Error handling middleware
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const ff = async (): Promise<void> => {
//   try {
//     const missile = await organization.find()
//     console.log(missile);
  
//   } catch (error) {
//     console.error("Error fetching missile:", error);
//   }
// };

// ff();

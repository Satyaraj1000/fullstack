import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import { adminRoutes } from "./routes/admin.routes.js"; // Ensure this is exported as default

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to Database
connectDb().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit the process on failure
});

// Middlewares
app.use(cors({ origin: "*" })); // Update this with actual frontend origins for better security
app.use(express.json());

// Routes
app.use("/api", adminRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

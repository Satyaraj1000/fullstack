import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import { adminRoutes } from "./routes/admin.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDb().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", adminRoutes);
app.use("/api",enquiryRoutes);


// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

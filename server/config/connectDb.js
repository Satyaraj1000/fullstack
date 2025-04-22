import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    // ✅ Ensure DB_URL is set
    if (!process.env.DB_URL) {
      throw new Error("Database connection error: Missing DB_URL in environment variables.");
    }

    await mongoose.connect(process.env.DB_URL);

    console.log("✅ Successfully connected to the database.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // ❗ Stops the app if DB connection fails
  }
};

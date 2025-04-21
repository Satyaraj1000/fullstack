import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    features: {
      type: [String],
      required: true,
    },
    applications: {
      type: [String],
      required: true,
    },
    industries: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
); // Adds createdAt & updatedAt fields automatically

export const Product = mongoose.model("Product", productSchema);

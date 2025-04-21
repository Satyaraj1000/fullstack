// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryUpload = async (localPath) => {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: "products",
  });
  fs.unlinkSync(localPath); // cleanup local file
  return result;
};

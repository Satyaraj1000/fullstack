// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "decq0woyf",
  api_key: "197737422683586",
  api_secret: "9JDWjybKmPmr0pYbO3YsNTkeh6w"
});

export const cloudinaryUpload = async (localPath) => {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: "products",
  });
  fs.unlinkSync(localPath); // cleanup local file
  return result;
};

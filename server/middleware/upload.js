import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📂 Saving file to uploads folder...");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    console.log("📸 File name:", uniqueName);
    cb(null, uniqueName);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  console.log("🔎 Checking file type:", file.mimetype);
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { files: 3 }, // Limit max files to 3
});

export default upload;

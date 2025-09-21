import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(process.cwd(), "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const limits = { fileSize: 2 * 1024 * 1024 }; // 2MB

const upload = multer({ storage, fileFilter, limits });

export default upload;
export { tempDir };
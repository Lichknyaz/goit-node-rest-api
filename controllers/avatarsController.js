import path from "path";
import fs from "fs/promises";
import User from "../db/user.js";

const avatarsDir = path.join(process.cwd(), "public", "avatars");

export const updateAvatarController = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const userId = req.user.id;

    // Ensure destination dir exists
    await fs.mkdir(avatarsDir, { recursive: true });

    const ext = path.extname(file.originalname) || path.extname(file.filename) || "";
    const uniqueName = `${userId}_${Date.now()}${ext}`;
    const destPath = path.join(avatarsDir, uniqueName);

    // Move file from temp to public/avatars with new name
    await fs.rename(file.path, destPath);

    const avatarURL = path.posix.join("/avatars", uniqueName);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ avatarURL });

    return res.json({ avatarURL });
  } catch (err) {
    next(err);
  }
};

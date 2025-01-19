import multer from "multer";
import { Request } from "express";

import fs from "fs";
import path from "path";

//Configuracion de subida
const storageAvatar = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    const user = req.user;

    const folderName = `${user.id} - ${user.name} ${user.last_name}`;
    const uploadPath = path.join(__dirname, "uploads", folderName, "avatar");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    callback(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, `avatar-${Date.now()}-${file.originalname}`);
  },
});
const storagePalm = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    const user = req.user;

    const folderName = `${user.id} - ${user.name} ${user.last_name}`;
    const uploadPath = path.join(__dirname, "uploads", folderName, "palm");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    callback(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, `Palm-${Date.now()}-${file.originalname}`);
  },
});

const uploads = {
  avatar: multer({ storage: storageAvatar }),
  palm: multer({ storage: storagePalm }),
};

export default uploads;

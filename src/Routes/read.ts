import { Router } from "express";
import readController from "../controllers/read";
import { auth } from "../middlewares/auth";
import { mobileCheck } from "../middlewares/mobile_cheker";

const router = Router();

router.post(
  "/read-creation",
  [auth, mobileCheck],
  readController.read_From_ChatGPT
);
router.get(
  "/get-read-by-id/:id",
  [auth, mobileCheck],
  readController.getReadById
);
router.get(
  "/get-user-reads",
  [auth, mobileCheck],
  readController.get_User_Reads
);

export default router;

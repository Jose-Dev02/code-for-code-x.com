import { Router } from "express";
import userController from "../controllers/user";
import { auth } from "../middlewares/auth";
import uploads from "../middlewares/multer_config";
import { mobileCheck } from "../middlewares/mobile_cheker";

const router = Router();

router.post("/register", mobileCheck, userController.register);

router.post("/verify-email", mobileCheck, userController.verify_email);

router.post(
  "/verification-code-email",
  mobileCheck,
  userController.code_verification
);
router.post(
  "/verification-code",
  mobileCheck,
  userController.verify_code_email
);

router.post(
  "/verification-code-password",
  mobileCheck,
  userController.password_recovery_code_email
);

router.post(
  "/edit-password-recovery",
  mobileCheck,
  userController.edit_password_from_recovery
);

router.post("/login", mobileCheck, userController.login);

router.put("/update-profile", [auth, mobileCheck], userController.edit_profile);

router.post(
  "/upload-avatar",
  [auth, mobileCheck, uploads.avatar.single("file0")],
  userController.upload_avatar
);

router.post(
  "/upload-palm",
  [auth, mobileCheck, uploads.palm.single("file0")],
  userController.upload_palm
);

router.get("/avatar/:file", [auth, mobileCheck], userController.avatar);

router.get("/avatar/:file", [auth, mobileCheck], userController.palm);

export default router;

import express from "express";

import validateBody from "../helpers/validateBody.js";

import { registerSchema, loginSchema, emailSchema } from "../schemas/authSchemas.js";
import {
  loginController,
  registerController,
  getCurrentController,
  logoutController,
  uploadAvatarController,
  verifyController,
  resendVerifyController
} from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";

import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerController);
authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.get("/current", authenticate, getCurrentController);
authRouter.post("/logout", authenticate, logoutController);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  uploadAvatarController
);
authRouter.get("/verify/:verificationToken", verifyController);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyController)

export default authRouter;

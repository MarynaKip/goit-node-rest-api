import express from "express";

import validateBody from "../helpers/validateBody.js";

import { registerSchema, loginSchema } from "../schemas/authSchemas.js"
import { loginController, registerController, getCurrentController, logoutController } from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerController)
authRouter.post("/login", validateBody(loginSchema), loginController)
authRouter.get("/current", authenticate, getCurrentController)
authRouter.post("/logout", authenticate, logoutController)

export default authRouter;
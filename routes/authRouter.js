import express from "express";

import validateBody from "../helpers/validateBody.js";
import {loginSchema, registerSchema} from "../schemas/authSchemas.js";
import {getCurrentController, loginController, registerController, logoutController} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { updateAvatarController } from "../controllers/avatarsController.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController)

authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatarController);

export default authRouter;

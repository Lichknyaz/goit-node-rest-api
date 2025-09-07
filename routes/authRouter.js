import express from "express";

import validateBody from "../helpers/validateBody.js";
import {loginSchema, registerSchema} from "../schemas/authSchemas.js";
import {getCurrentController, loginController, registerController, logoutController} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController)

export default authRouter;

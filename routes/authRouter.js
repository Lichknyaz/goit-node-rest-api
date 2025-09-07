import express from "express";

import validateBody from "../helpers/validateBody.js";
import {loginSchema, registerSchema} from "../schemas/authSchemas.js";
import {registerController} from "../controllers/authControllers.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerController);


export default authRouter;

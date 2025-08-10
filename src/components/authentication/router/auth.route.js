import { Router } from "express";

import registerController from "../controller/register.controller.js";
import loginController from "../controller/login.controller.js";
import refreshTokenController from "../controller/token.controller.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refresh-token", refreshTokenController);

export default authRouter;

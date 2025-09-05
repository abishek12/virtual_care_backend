import { Router } from "express";

import registerController from "../controller/register.controller.js";
import loginController from "../controller/login.controller.js";
import refreshTokenController from "../controller/token.controller.js";
import logoutController from "../controller/logout.controller.js";

const authRouter = Router();

authRouter
  .post("/register", registerController)
  .post("/login", loginController)
  .post("/refresh-token", refreshTokenController)
  .post("/logout", logoutController);

export default authRouter;

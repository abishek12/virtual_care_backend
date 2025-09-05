import express from "express";
import {
  authenticate,
  authorize,
} from "../../../middlewares/auth.middleware.js";

const router = express.Router();

import {
  listUserController,
  userProfile,
} from "../controllers/list.user.controller.js";
import deleteUser from "../controllers/delete.user.controller.js";

router
  .get("", authenticate, authorize("readAny", "profile"), listUserController)
  .get("/me", authenticate, authorize("readOwn", "profile"), userProfile)
  .delete("/:id", authenticate, authorize("deleteOwn", "profile"), deleteUser);

export default router;

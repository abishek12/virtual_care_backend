import express from "express";

const router = express.Router();

import {
  listUserController,
  userProfile,
} from "../controllers/list.user.controller.js";
import deleteUser from "../controllers/delete.user.controller.js";

router
  .get("", listUserController)
  .get("/:username", userProfile)
  .delete("/:id", deleteUser);

export default router;

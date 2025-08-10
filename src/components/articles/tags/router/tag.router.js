import express from "express";

const router = express.Router();

import listAllTags from "../controllers/list.tag.controller.js";
import newTag from "../controllers/new.tag.controller.js";
import deleteTag from "../controllers/delete.tag.controller.js";
import updateTag from "../controllers/edit.tag.controller.js";

router
  .get("/", listAllTags)
  .post("/", newTag)
  .delete("/:id", deleteTag)
  .patch("/:id", updateTag);

export default router;

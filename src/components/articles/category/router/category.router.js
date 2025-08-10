import express from "express";

const router = express.Router();

import listAllCategory from "../controllers/list.category.controller.js";
import newCategory from "../controllers/new.category.controller.js";
import deleteCategory from "../controllers/delete.category.controller.js";
import updateCategory from "../controllers/edit.category.controller.js";

router
  .get("/", listAllCategory)
  .post("/", newCategory)
  .delete("/:id", deleteCategory)
  .patch("/:id", updateCategory);

export default router;

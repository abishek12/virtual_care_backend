import express from "express";

const router = express.Router();

import { listAllBlogs } from "../controllers/list.blog.controller.js";
import { createBlog } from "../controllers/new.blog.controller.js";
import { deleteBlog } from "../controllers/delete.blog.controller.js";
// import updateCategory from "../controllers/edit.category.controller.js";

router.get("/", listAllBlogs).post("/", createBlog).delete("/:id", deleteBlog);
// .patch("/:id", updateCategory);

export default router;

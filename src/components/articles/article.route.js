import express from "express";

import blogRoute from "./blogs/router/blog.router.js";
import categoryRoute from "./category/router/category.router.js";
import tagRoute from "./tags/router/tag.router.js";

const router = express.Router();

router
  .use("/blog", blogRoute)
  .use("/category", categoryRoute)
  .use("/tag", tagRoute);

export default router;

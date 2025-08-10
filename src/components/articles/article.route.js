import express from "express";

import categoryRoute from "./category/router/category.router.js";
import tagRoute from "./tags/router/tag.router.js";

const router = express.Router();

router.use("/category", categoryRoute).use("/tag", tagRoute);

export default router;

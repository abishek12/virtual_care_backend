import express from "express";

const router = express.Router();

import listAllTestimonial from "../controllers/list.testimonial.controller.js";
import { createTestimonial } from "../controllers/create.testimonial.controller.js";

router.get("", listAllTestimonial).post("/", createTestimonial);

export default router;

import express from "express";

const router = express.Router();

import listAllTestimonial from "../controllers/list.testimonial.controller.js";
import { createTestimonial } from "../controllers/create.testimonial.controller.js";
import { deleteTestimonial } from "../controllers/delete.testimonial.controller.js";

import {
  authenticate,
  authorize,
} from "../../../middlewares/auth.middleware.js";

router
  .get("", listAllTestimonial)
  .post(
    "/",
    authenticate,
    authorize("createAny", "testimonial"),
    createTestimonial
  )
  .delete("/delete/:id", deleteTestimonial);

export default router;

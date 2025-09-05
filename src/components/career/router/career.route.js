import express from "express";

import { listAllCareers } from "../controllers/list.career.controller.js";
import { newCareer } from "../controllers/new.career.controller.js";
import { deleteCareer } from "../controllers/delete.career.controller.js";

import {
  authenticate,
  authorize,
} from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router
  .get("/", authenticate, authorize("readAny", "career"), listAllCareers)
  .delete(
    "/delete/:id",
    authenticate,
    authorize("deleteAny", "career"),
    deleteCareer
  )
  .post("/", newCareer);

export default router;

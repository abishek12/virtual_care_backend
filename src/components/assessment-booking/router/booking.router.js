import express from "express";

import { listAllBooking } from "../controllers/list.booking.controller.js";
import createBooking from "../controllers/create.booking.controller.js";
import editCategory from "../controllers/update.booking.controller.js";
import deleteBooking from "../controllers/delete.booking.controller.js";

const router = express.Router();

router
  .get("/", listAllBooking)
  .post("/", createBooking)
  .delete("/:id", deleteBooking)
  .patch("/:id", editCategory);

export default router;

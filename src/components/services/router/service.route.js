import express from "express";

const router = express.Router();

import listAllServices from "../controllers/list.service.controller.js";
import createService from "../controllers/new.service.controller.js";
import deleteService from "../controllers/delete.service.controller.js";

router
  .get("", listAllServices)
  .post("/", createService)
  .delete("/:id", deleteService);

export default router;

import express from "express";

const router = express.Router();

import listAllContact from "../controllers/list.contact.controller.js";
import createContact from "../controllers/new.contact.controller.js";
import deleteContact from "../controllers/delete.contact.controller.js";

router
  .get("", listAllContact)
  .post("/", createContact)
  .delete("/:id", deleteContact);

export default router;

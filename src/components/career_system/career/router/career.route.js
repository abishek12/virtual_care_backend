import express from "express";

import { listAllCareers } from "../controllers/list.career.controller";

const router = express.Router();

router.get("/", listAllCareers);

export default router;

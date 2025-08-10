import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import { errorHandler } from "./src/middlewares/error.middleware.js";
import { connectDB } from "./src/lib/constants/database.js";

import logger from "./src/lib/utils/logger.js";

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging
const stream = {
  write: (message) => logger.info(message.trim()),
};

app.use(morgan("combined", { stream }));

import apiRouter from "./api.router.js";

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is up",
  });
});

app.use("/api/v1", apiRouter);

// Error Handler
app.use(errorHandler);

export default app;

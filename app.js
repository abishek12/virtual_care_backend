import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

import { errorHandler } from "./src/middlewares/error.middleware.js";
import { connectDB } from "./src/lib/constants/database.js";

import logger from "./src/lib/utils/logger.js";

const app = express();

// Connect to Database
connectDB();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const localhostRegex = /^http:\/\/localhost:\d+$/;

    const allowedDomains = [
      /^https:\/\/(.*\.)?vitalcaregroup\.com.au$/,
      /^https:\/\/staging\.vitalcaregroup\.com.au$/,
    ];

    if (
      localhostRegex.test(origin) ||
      allowedDomains.some((regex) => regex.test(origin))
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(helmet());
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

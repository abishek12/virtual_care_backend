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
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5173",
  "https://vitalcaregroup.com.au",
  "https://account.vitalcaregroup.com.au",
  "https://api.vitalcaregroup.com.au",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // Allow non-browser clients like curl, Postman
      return callback(null, true);
    }
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you need cookies/JWTs
  optionsSuccessStatus: 200, // for older browsers
};
app.use(cors(corsOptions));

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

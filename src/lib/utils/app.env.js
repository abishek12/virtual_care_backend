import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 3000;
export const env = process.env.NODE_ENV || "development";
export const db_host = process.env.DB_HOST || "localhost";
export const db_user = process.env.DB_USER || "admin";
export const db_pass = process.env.DB_PASS || "";
export const db_name = process.env.DB_NAME || "mama";
export const db_port = process.env.DB_PORT || 3306;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

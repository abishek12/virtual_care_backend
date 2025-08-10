import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 3000;
export const env = process.env.NODE_ENV || "development";
export const db_host = process.env.DB_HOST || "localhost";
export const db_user = process.env.DB_USER || "admin";
export const db_pass = process.env.DB_PASS || "admin";
export const db_name = process.env.DB_NAME || "";
export const db_port = process.env.DB_PORT || 3306;

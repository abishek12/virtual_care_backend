import { Sequelize } from "sequelize";

import {
  db_host,
  db_name,
  db_user,
  db_pass,
  db_port,
  env,
} from "../utils/app.env.js";
import logger from "../utils/logger.js";

const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  dialect: "mysql",
  port: db_port,
  logging: env === "development",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+05:45",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    if (env !== "production") {
      await sequelize.sync({ alter: true });
    } else {
      logger.info(
        "Production environment: Schema should be managed through migrations"
      );
    }
    logger.info("Connected to DB");
  } catch (err) {
    logger.error(`Database connection failed: ${err}`);
  }
};

export { sequelize, connectDB };

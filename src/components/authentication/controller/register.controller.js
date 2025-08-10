import bcrypt from "bcryptjs";
import crypto from "crypto";

import UserModel from "../../users/model/UserModel.js";
import logger from "../../../lib/utils/logger.js";
import { registerSchema } from "../helper/auth.helper.js";

const registerController = async (req, res) => {
  try {
    let { error, value } = registerSchema.validate(req.body);

    if (error) {
      logger.error(`Register Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    value.email = value.email.toLowerCase().trim();

    let existingUser = await UserModel.findOne({
      where: {
        email: value.email,
      },
    });

    if (existingUser) {
      logger.warn(`Register Error: User already exists`);
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value.password, salt);
    value.password = hash;

    const randomCode = crypto.randomBytes(4).toString("hex");

    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    const user = await UserModel.create({
      ...value,
      user_code: `vital-${year}-${day}-${randomCode}`,
    });
    logger.info(`${value.fullname} registered successfully at ${new Date()}`);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default registerController;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../../users/model/UserModel.js";
import { loginSchema } from "../helper/auth.helper.js";
import logger from "../../../lib/utils/logger.js";

const loginController = async (req, res) => {
  try {
    let { error, value } = loginSchema.validate(req.body);

    if (error) {
      logger.error(`Login Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let user = await UserModel.findOne({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      logger.error("Login Error: User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const is_matched = bcrypt.compareSync(value.password, user.password);

    if (!is_matched) {
      logger.error("Login Error: Password did not matched");
      return res.status(400).json({
        success: false,
        message: "Password did not matched",
      });
    }

    const access_token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refresh_token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    logger.info(`${user.fullname} logged in successfully at ${new Date()}`);

     res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      access_token,
      refresh_token,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default loginController;

import { Op } from "sequelize";

import UserModel from "../model/UserModel.js";
import logger from "../../../lib/utils/logger.js";

const listUserController = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let { username, email, role } = req.query;

    let { rows: items, count } = await UserModel.findAndCountAll({
      where: {
        is_deleted: 0,
        // username: {
        //   [Op.like]: `%${username}%`,
        // },
      },
      limit: limit,
      offset: (page - 1) * limit,
    });

    let pagination = {
      page: Math.ceil(count / limit),
      limit,
      total: count,
    };

    return res.status(200).json({
      success: true,
      items,
      pagination,
      message: "Success",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const userProfile = async (req, res) => {
  try {
    let userid = req.user.id;

    let item = await UserModel.findOne({
      where: { id: userid, is_deleted: 0 },
      attributes: { exclude: ["password"] },
    }).then((value) => {
      if (!value) {
        logger.error("User not found");
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });

    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { listUserController, userProfile };

import CareerRecepientModel from "../models/career.model.js";
import logger from "../../../lib/utils/logger.js";

const listAllCareers = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let status = req.query.status || "";

    let whereCondition = {};

    if (status) {
      whereCondition.status = status;
    }

    let { rows: items, count } = await CareerRecepientModel.findAndCountAll({
      where: {
        ...whereCondition,
      },
      limit: limit,
      offset: (page - 1) * limit,
    });

    let pagination = {
      page: Math.ceil(count / limit),
      limit,
      total: count,
    };

    logger.error(`All Career Fetched - ${new Date()}`);

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

const careerDetail = async (req, res) => {
  try {
    let { slug } = req.params;
    let items = await CareerModel.findOne({
      where: { slug },
    });

    if (!items) {
      logger.error(` Career not found ${slug} - ${new Date()}`);
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }
    logger.error(` Career Fetched ${slug} - ${new Date()}`);
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

export { listAllCareers, careerDetail };

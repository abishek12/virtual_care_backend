import TestimonialModel from "../model/testimonial.model.js";
import logger from "../../../../lib/utils/logger.js";

const listAllTestimonial = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let { rows: items, count } = await TestimonialModel.findAndCountAll({
      where: {},
      limit: limit,
      offset: (page - 1) * limit,
    });

    let pagination = {
      page: Math.ceil(count / limit),
      limit,
      total: count,
    };

    logger.error(`All Testimonial Fetched - ${new Date()}`);

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

export default listAllTestimonial;

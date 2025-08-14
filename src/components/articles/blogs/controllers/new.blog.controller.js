import slugs from "slugs";

import BlogModel from "../models/blog.model.js";
import blogHelper from "../helper/blog.helper.js";
import logger from "../../../../lib/utils/logger.js";

export const createBlog = async (req, res) => {
  try {
    let { error, value } = blogHelper.validate(req.body);

    if (error) {
      logger.error(`Create Blog Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let items = await BlogModel.create({
      ...value,
      slugs: slugs(value.title),
    });

    logger.info(`Blog created successfully at ${new Date()}`);

    return res.status(201).json({
      success: true,
      items,
      message: "Blog created successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

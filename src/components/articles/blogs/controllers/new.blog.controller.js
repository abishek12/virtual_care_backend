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

    // Check if image was uploaded
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    let items = await BlogModel.create({
      ...value,
      slugs: slugs(value.title),
      featured_image: req.file.path,
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

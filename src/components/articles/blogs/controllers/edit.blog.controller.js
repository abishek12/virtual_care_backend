import slugs from "slugs";

import BlogModel from "../models/blog.model.js";
import logger from "../../../../lib/utils/logger.js";

export const editBlog = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description } = req.body;

    let item = await BlogModel.findByPk(id);

    if (!item) {
      logger.error(`Blog not found - ${Date.now()}`);
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updates = {};

    if (title && title !== item.title) {
      updates.title = title;
      updates.slugs = slugs(title);
    }
    if (description) updates.description = description;

    await BlogModel.update(updates, {
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Contact Updated",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

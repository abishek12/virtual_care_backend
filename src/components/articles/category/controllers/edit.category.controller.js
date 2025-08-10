import slugs from "slugs";

import CategoryModel from "../model/category.model.js";
import logger from "../../../../lib/utils/logger.js";

const editCategory = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description } = req.body;

    let contact = await CategoryModel.findByPk(id);

    if (!contact) {
      logger.error(`Category not found - ${Date.now()}`);
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const updates = {};

    if (title && title !== contact.title) {
      updates.title = title;
      updates.slugs = slugs(title);
    }
    if (description) updates.description = description;

    await CategoryModel.update(updates, {
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

export default editCategory;

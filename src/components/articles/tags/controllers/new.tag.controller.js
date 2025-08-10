import slugs from "slugs";

import CategoryModel from "../model/tag.model.js";
import categoryHelper from "../helper/tag.helper.js";
import logger from "../../../../lib/utils/logger.js";

const createCategory = async (req, res) => {
  try {
    let { error, value } = categoryHelper.validate(req.body);

    if (error) {
      logger.error(`Create Service Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let items = await CategoryModel.create({
      ...value,
      slugs: slugs(value.title),
    });

    logger.info(`Category created successfully at ${new Date()}`);

    return res.status(201).json({
      success: true,
      items,
      message: "Category created successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default createCategory;

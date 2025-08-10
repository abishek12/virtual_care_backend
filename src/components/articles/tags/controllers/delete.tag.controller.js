import CategoryModel from "../model/tag.model.js";
import logger from "../../../../lib/utils/logger.js";

const deleteCategory = async (req, res) => {
  try {
    let { id } = req.params;

    let category = await CategoryModel.findByPk(id);

    if (!category) {
      logger.error("Category not found");
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    await category.update(
      {
        is_delete: 1,
      },
      {
        where: {
          id,
        },
      }
    );
    logger.info(`Category of ${id} is deleted - ${new Date()}`);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default deleteCategory;

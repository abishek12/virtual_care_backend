import BlogModel from "../models/blog.model.js";
import logger from "../../../../lib/utils/logger.js";

export const deleteBlog = async (req, res) => {
  try {
    let { id } = req.params;

    let blog = await BlogModel.findByPk(id);

    if (!blog) {
      logger.error("Blog not found");
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    await blog.update(
      {
        is_delete: 1,
      },
      {
        where: {
          id,
        },
      }
    );
    logger.info(`Blog of ${id} is deleted - ${new Date()}`);
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

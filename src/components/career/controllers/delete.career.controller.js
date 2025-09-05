import CareerRecepientModel from "../models/career.model.js";
import logger from "../../../lib/utils/logger.js";

export const deleteCareer = async (req, res) => {
  try {
    let { id } = req.params;

    let career = await CareerRecepientModel.findOne({
      where: { id },
    });

    if (!career) {
      logger.error(`Career not found ${id} - ${new Date()}`);
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    await CareerRecepientModel.destroy({
      where: { id },
    });

    return res.status(204).json({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

import ServiceModel from "../model/ServiceModel.js";
import logger from "../../../lib/utils/logger.js";

const deleteService = async (req, res) => {
  try {
    let { id } = req.parms;

    let service = await ServiceModel.findByPk(id);

    if (!service) {
      logger.error("Service not found");
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await service.update(
      {
        is_delete: 1,
      },
      {
        where: {
          id,
        },
      }
    );

    logger.info(`Service deleted successfully at ${new Date()}`);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default deleteService;

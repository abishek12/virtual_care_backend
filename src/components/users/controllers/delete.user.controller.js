import UserModel from "../model/UserModel.js";
import logger from "../../../lib/utils/logger.js";

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    let service = await UserModel.findByPk(id);

    if (!service) {
      logger.error("User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (service.is_deleted === 1) {
      logger.error("User already deleted");
      return res.status(400).json({
        success: false,
        message: "User already deleted",
      });
    }

    await service.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id,
        },
      }
    );

    logger.info(`User deleted successfully at ${new Date()}`);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default deleteUser;

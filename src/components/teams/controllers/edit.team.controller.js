import { TeamModel } from "../models/team.model.js";
import logger from "../../../lib/utils/logger.js";

export const editTeam = async (req, res) => {
  try {
    let { id } = req.params;
    let { fullname, designation, status } = req.body;

    let team = await TeamModel.findByPk(id);

    if (!team) {
      logger.error(`Team not found - ${Date.now()}`);
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const updates = {};

    if (fullname) updates.fullname = fullname;
    if (designation) updates.designation = designation;
    if (status) updates.status = status;

    await TeamModel.update(updates, {
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Team Profile Updated",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

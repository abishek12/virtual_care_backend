import { TeamModel } from "../models/team.model.js";
import { teamHelper } from "../helper/team.helper.js";
import logger from "../../../lib/utils/logger.js";

export const createTeam = async (req, res) => {
  try {
    let { error, value } = teamHelper.validate(req.body);

    if (error) {
      logger.error(`Create Team Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let team = await TeamModel.create(value);

    logger.info(`Team created successfully at ${new Date()}`);

    return res.status(201).json({
      success: true,
      team,
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

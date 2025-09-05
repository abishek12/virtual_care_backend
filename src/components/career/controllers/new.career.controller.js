import CareerModel from "../models/career.model.js";
import logger from "../../../lib/utils/logger.js";
import { careerSchema } from "../helper/career.helper.js";

export const newCareer = async (req, res) => {
  try {
    let { error, value } = careerSchema.validate(req.body);
    if (error) {
      logger.error(
        "Validation error in newCareer controller: ",
        error.details[0].message
      );
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCareerEntry = new CareerModel(value);
    await newCareerEntry.save();

    return res.status(201).json({
      success: true,
      message: "Career entry created successfully",
    });
  } catch (error) {
    logger.error("Error in newCareer controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

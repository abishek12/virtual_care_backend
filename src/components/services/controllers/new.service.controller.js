import slugs from "slugs";

import ServiceModel from "../model/ServiceModel.js";
import serviceHelper from "../helper/service.helper.js";
import logger from "../../../lib/utils/logger.js";

const createService = async (req, res) => {
  try {
    let { error, value } = serviceHelper.validate(req.body);

    if (error) {
      logger.error(`Create Service Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let service = await ServiceModel.create({
      ...value,
      slugs: slugs(value.title),
    });

    logger.info(`Services created successfully at ${new Date()}`);

    return res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default createService;

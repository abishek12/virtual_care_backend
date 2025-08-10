import ContactModel from "../model/ContactModel.js";
import contactHelper from "../helper/contact.helper.js";
import logger from "../../../lib/utils/logger.js";

const createService = async (req, res) => {
  try {
    let { error, value } = contactHelper.validate(req.body);

    if (error) {
      logger.error(`Create Service Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let service = await ContactModel.create(value);

    logger.info(`Contact created successfully at ${new Date()}`);

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

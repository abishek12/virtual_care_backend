import ContactModel from "../model/ContactModel.js";
import logger from "../../../lib/utils/logger.js";

const deleteContact = async (req, res) => {
  try {
    let { id } = req.parms;

    let contact = await ContactModel.findByPk(id);

    if (!contact) {
      logger.error("Contact not found");
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await contact.update(
      {
        is_delete: 1,
      },
      {
        where: {
          id,
        },
      }
    );

    logger.info(`Contact deleted successfully at ${new Date()}`);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default deleteContact;

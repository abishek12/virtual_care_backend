import BookingModel from "../model/booking.model.js";
import logger from "../../../lib/utils/logger.js";

const updateBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let { status } = req.body;

    let booking = await BookingModel.findByPk(id);

    if (!booking) {
      logger.error(`Booking not found - ${Date.now()}`);
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const updates = {};

    if (status) updates.status = status;

    await BookingModel.update(updates, {
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booking Updated",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default updateBooking;

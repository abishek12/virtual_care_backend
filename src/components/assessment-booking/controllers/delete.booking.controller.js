import BookingModel from "../model/booking.model.js";
import logger from "../../../lib/utils/logger.js";

const deleteBooking = async (req, res) => {
  try {
    let { id } = req.params;

    let booking = await BookingModel.findByPk(id);

    if (!booking) {
      logger.error("Booking not found");
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    await booking.update(
      {
        is_delete: 1,
      },
      {
        where: {
          id,
        },
      }
    );
    logger.info(`Booking of ${id} is deleted - ${new Date()}`);
    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default deleteBooking;

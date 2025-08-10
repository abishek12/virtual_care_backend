import BookingModel from "../model/booking.model.js";
import bookingSchema from "../helper/booking.helper.js";
import logger from "../../../lib/utils/logger.js";

const createBooking = async (req, res) => {
  try {
    let { error, value } = bookingSchema.validate(req.body);

    if (error) {
      logger.error(`Create Booking Error: ${error}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let items = await BookingModel.create(value);

    logger.info(`Booking created successfully at ${new Date()}`);

    return res.status(201).json({
      success: true,
      items,
      message: "Booking created successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default createBooking;

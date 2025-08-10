import BookingModel from "../model/booking.model.js";
import logger from "../../../lib/utils/logger.js";

const listAllBooking = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let { rows: items, count } = await BookingModel.findAndCountAll({
      where: {},
      limit: limit,
      offset: (page - 1) * limit,
    });

    let pagination = {
      page: Math.ceil(count / limit),
      limit,
      total: count,
    };

    return res.status(200).json({
      success: true,
      items,
      pagination,
      message: "Success",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { listAllBooking };

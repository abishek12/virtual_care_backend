import TestimonialModel from "../model/testimonial.model.js";
import logger from "../../../lib/utils/logger.js";

export const deleteTestimonial = async (req, res) => {
  try {
    let { id } = req.params;

    let testimonial = await TestimonialModel.findOne({
      where: {
        id,
        is_deleted: 0,
      },
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.is_deleted = 1;
    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

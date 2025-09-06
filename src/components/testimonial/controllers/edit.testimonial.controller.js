import TestimonialModel from "../model/testimonial.model.js";

import { testimonialSchema } from "../helper/testimonial.helper.js";
import logger from "../../../lib/utils/logger.js";

export const editTestimonial = async (req, res) => {
  try {
    let { id } = req.params;
    const { error, value } = testimonialSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let testimonial = await TestimonialModel.findOne({
      where: {
        id,
        is_deleted: 0,
      },
    });

    if (!testimonial) {
      logger.error("Testimonial not found");
      return res.status(404).json({
        success: false,
        message: "Item Not Found",
      });
    }

    await testimonial.update(value);
    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

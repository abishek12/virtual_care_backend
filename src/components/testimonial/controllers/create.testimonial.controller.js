import TestimonialModel from "../model/testimonial.model.js";

import { testimonialSchema } from "../helper/testimonial.helper.js";
import logger from "../../../lib/utils/logger.js";

export const createTestimonial = async (req, res) => {
  try {
    const { error, value } = testimonialSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const testimonial = await TestimonialModel.create(value);
    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    logger.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

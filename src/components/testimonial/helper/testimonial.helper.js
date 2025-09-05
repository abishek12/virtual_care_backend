import Joi from "joi";

export const testimonialSchema = Joi.object({
  fullname: Joi.string().required(),
  description: Joi.string().required(),
  rating: Joi.number().integer().default(3),
  is_active: Joi.boolean().default(true),
});


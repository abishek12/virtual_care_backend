import Joi from "joi";

const testimonial = Joi.object({
  fullname: Joi.string().required(),
  description: Joi.string().required(),
  rating: Joi.number().integer().default(3),
});

export default testimonial;

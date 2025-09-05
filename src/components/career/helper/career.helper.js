import Joi from "joi";

export const careerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  position_applied: Joi.string().required(),
  experience_level: Joi.string().required(),
  suburb: Joi.string().required(),
  is_driver: Joi.boolean().required(),
  resume: Joi.string().required(),
  cover_letter: Joi.string().required(),
  supporting_document: Joi.string().required(),
  status: Joi.string()
    .valid("pending", "contact", "hired", "rejected")
    .default("pending")
    .required(),
});

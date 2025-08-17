import Joi from "joi";

export const teamHelper = Joi.object({
  fullname: Joi.string().required(),
  designation: Joi.string().required(),
  profile_image: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").required(),
});

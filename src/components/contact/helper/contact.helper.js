import Joi from "joi";

const contactHelper = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

export default contactHelper;

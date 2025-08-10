import Joi from "joi";

const tagHelper = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  author_id: Joi.number().integer().required(),
});

export default tagHelper;

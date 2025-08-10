import Joi from "joi";

const categoryHelper = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  author_id: Joi.number().integer().required(),
});

export default categoryHelper;

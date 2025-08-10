import Joi from "joi";

const serviceHelper = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  featured_image: Joi.string().required(),
  author_id: Joi.number().integer().required(),
});

export default serviceHelper;

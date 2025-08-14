import Joi from "joi";

const blogHelper = Joi.object({
  title: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  tags: Joi.array().items(Joi.string()).required(),
  author_id: Joi.number().integer().required(),
  featured_image: Joi.string().required(),
  short_description: Joi.string().required(),
  description: Joi.string().allow(""),
  seo: Joi.string().optional(),
});

export default blogHelper;

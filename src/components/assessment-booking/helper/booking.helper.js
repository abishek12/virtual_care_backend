import Joi from "joi";

const bookingSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  date_of_visit: Joi.date().required(),
  type_of_service: Joi.string().required(),
  message_notes: Joi.string(),
  staus: Joi.string()
    .valid("pending", "read", "unread", "archive")
    .default("pending"),
});

export default bookingSchema;

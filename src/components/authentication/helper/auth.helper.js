import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(
      "administrator",
      "receptionist",
      "doctor",
      "nurse",
      "pharmacist",
      "subscriber"
    )
    .default("subscriber")
    .required(),
});

export { loginSchema, registerSchema };

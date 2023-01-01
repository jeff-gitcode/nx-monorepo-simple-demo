import * as Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
  allowUnknown: true,
});

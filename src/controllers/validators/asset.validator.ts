import Joi from 'joi';

export const createAssetSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  collectionId: Joi.string().required(),
  categoryIds: Joi.array(),
  description: Joi.string(),
});

export const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
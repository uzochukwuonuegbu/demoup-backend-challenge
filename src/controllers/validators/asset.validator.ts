import Joi from 'joi';

export const createAssetSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  collectionId: Joi.string().required(),
  categoryIds: Joi.array(),
  description: Joi.string(),
});
import Joi from "joi";

export const createBrandSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Tên thương hiệu không được để trống",
    "any.required": "Trường tên thương hiệu là bắt buộc",
  }),
});

export const updateBrandSchema = Joi.object({
  title: Joi.string().trim().messages({
    "string.empty": "Tên thương hiệu không được để trống",
  }),
});

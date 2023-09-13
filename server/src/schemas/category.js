import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên danh mục không được để trống",
    "any.required": "Trường tên danh mục là bắt buộc",
  }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "Tên danh mục không được để trống",
  }),
});

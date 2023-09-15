import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên danh mục không được để trống",
    "any.required": "Trường tên danh mục là bắt buộc",
  }),
  brand: Joi.array().items(Joi.string().trim().required()).min(1).messages({
    "array.base": "Thương hiệu sản phẩm phải là một mảng",
    "array.min": "Vui lòng chọn ít nhất một thương hiệu",
    "any.required": "Trường thương hiệu là bắt buộc",
  }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "Tên danh mục không được để trống",
  }),
  brand: Joi.array().items(Joi.string().trim().required()).min(1).messages({
    "array.base": "Thương hiệu sản phẩm phải là một mảng",
    "array.min": "Vui lòng chọn ít nhất một thương hiệu",
  }),
});

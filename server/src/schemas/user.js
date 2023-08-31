import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không đúng định dạng",
    "any.required": "Trường email là bắt buộc",
  }),
  password: Joi.string().trim().required().min(6).messages({
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
  }),
  confirmPassword: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Xác nhận mật khẩu không được để trống",
      "any.required": "Trường xác nhận mật khẩu là bắt buộc",
      "any.only": "Xác nhận mật khẩu không khớp",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().trim().required().min(6).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc ",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "Tên không được để trống",
  }),
  email: Joi.string().trim().email().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không đúng định dạng",
  }),
  mobile: Joi.string().trim().messages({
    "string.empty": "Số điện thoại không được để trống",
  }),
  address: Joi.string().trim().messages({
    "string.empty": "Địa chỉ không được để trống",
  }),
  avatar: Joi.string().trim().messages({
    "string.empty": "Ảnh đại diện của tài khoản không được để trống",
  }),
  password: Joi.string().trim().min(6).messages({
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "string.empty": "Password không được để trống",
  }),
});

export const updateUserAdminSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "Tên không được để trống",
  }),
  mobile: Joi.string().trim().messages({
    "string.empty": "Số điện thoại không được để trống",
  }),
  email: Joi.string().trim().email().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không đúng định dạng",
  }),
  address: Joi.string().trim().messages({
    "string.empty": "Địa chỉ không được để trống",
  }),
  password: Joi.string().trim().min(6).messages({
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "string.empty": "Password không được để trống",
  }),
  isAdmin: Joi.boolean().messages({
    "any.empty": "Quyền của người dùng không được để trống",
    "any.base": "Quyền isAdmin phải là true hoặc false",
  }),
  isBlocked: Joi.boolean().messages({
    "any.only": "isBlocked phải là true hoặc false",
    "any.empty": "isBlocked không được để trống",
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().trim().required().min(6).messages({
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
  }),
  confirmPassword: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Xác nhận mật khẩu không được để trống",
      "any.required": "Trường xác nhận mật khẩu là bắt buộc",
      "any.only": "Xác nhận mật khẩu không khớp",
    }),
  token: Joi.string().trim().messages({
    "string.empty": "Token không được để trống",
  }),
});

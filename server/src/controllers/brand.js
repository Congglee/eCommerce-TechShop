import Brand from "../models/brand.js";
import { createBrandSchema, updateBrandSchema } from "../schemas/brand.js";

const createNewBrand = async (req, res) => {
  try {
    const { error } = createBrandSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.reduce((acc, errItem) => {
        acc[errItem.path[0]] = errItem.message;
        return acc;
      }, {});
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const response = await Brand.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      createdBrand: response
        ? response
        : "Thêm thương hiệu sản phẩm không thành công",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getBrands = async (req, res) => {
  try {
    const response = await Brand.find();

    return res.status(200).json({
      success: response ? true : false,
      brands: response ? response : "Không lấy được danh sách thương hiệu",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { error } = updateBrandSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.reduce((acc, errItem) => {
        acc[errItem.path[0]] = errItem.message;
        return acc;
      }, {});
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { id } = req.params;
    const response = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: response ? true : false,
      updatedBrand: response
        ? response
        : "Cập nhật thương hiệu sản phẩm thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Brand.findByIdAndDelete(id);

    return res.status(200).json({
      success: response ? true : false,
      deletedBrand: response ? response : "Xóa thương hiệu thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { createNewBrand, getBrands, updateBrand, deleteBrand };

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

    const brandTitle = req.body.title;
    const existingBrand = await Brand.findOne({
      title: { $regex: brandTitle, $options: "i" },
    });
    if (existingBrand) {
      return res.status(400).json({
        success: false,
        message:
          "Thương hiệu có cùng tên đã tồn tại, vui lòng nhập lại tên thương hiệu",
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
    const queries = { ...req.query };
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((item) => delete queries[item]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedItem) => `$${matchedItem}`
    );

    const formattedQueries = JSON.parse(queryString);

    if (queries?.title)
      formattedQueries.title = { $regex: queries.title, $options: "i" };

    let queryCommand = Brand.find(formattedQueries);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;

    queryCommand = queryCommand.skip(skip).limit(limit);

    const response = await queryCommand.exec();
    const totalBrand = await Brand.countDocuments(formattedQueries);
    const totalPages = Math.ceil(totalBrand / +limit);

    return res.status(200).json({
      success: response ? true : false,
      totalPages,
      totalBrand,
      brands: response ? response : "Không lấy được thương hiệu",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    return res.json({
      success: brand ? true : false,
      brand: brand ? brand : "Không lấy được thương hiệu",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
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
      message: "Xóa thương hiệu thành công",
      deletedBrand: response ? response : "Xóa thương hiệu thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { createNewBrand, getBrands, getBrand, updateBrand, deleteBrand };

import Category from "../models/category.js";
import Product from "../models/product.js";
import slugify from "slugify";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.js";

const createCategory = async (req, res) => {
  try {
    const { error } = createCategorySchema.validate(req.body, {
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

    const categoryName = req.body.name;
    const existingCategory = await Category.findOne({
      name: { $regex: categoryName, $options: "i" },
    });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message:
          "Danh mục có cùng tên đã tồn tại, vui lòng nhập lại tên danh mục",
      });
    }

    const newCategorySlug = slugify(req.body.name, { lower: true });
    const newCategory = await Category.create({
      ...req.body,
      slug: newCategorySlug,
    });

    return res.status(200).json({
      success: newCategory ? true : false,
      createdCategory: newCategory
        ? newCategory
        : "Thêm danh mục danh mục không thành công",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
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

    if (queries?.name)
      formattedQueries.name = { $regex: queries.name, $options: "i" };

    let queryCommand = Category.find(formattedQueries).populate({
      path: "products",
      select: "name slug thumb price",
    });

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    } else {
      queryCommand = queryCommand.select("-__v");
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;

    queryCommand = queryCommand.skip(skip).limit(limit);

    const response = await queryCommand.exec();
    const totalCategory = await Category.countDocuments(formattedQueries);
    const totalPages = Math.ceil(totalCategory / +limit);

    return res.status(200).json({
      success: response ? true : false,
      totalPages,
      totalCategory,
      categories: response ? response : "Không lấy được danh mục",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("products");
    const products = await Product.find({ category: req.params.id }).select(
      "-createdAt -__v -updatedAt"
    );

    return res.json({
      success: category ? true : false,
      productCategory: category
        ? { ...category.toObject(), products }
        : "Không lấy được danh mục sản phẩm",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    const products = await Product.find({ category });

    if (products.length > 0) {
      const uncategorized = await Category.findOne({ name: "uncategorized" });

      await Product.updateMany(
        { category: category._id },
        { $set: { category: uncategorized._id } }
      );
    }

    await Category.deleteOne({ _id: category._id });
    return res.status(200).json({
      success: true,
      message: "Xóa danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { error } = updateCategorySchema.validate(req.body, {
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
    const category = await Category.findById(id);
    if (!category)
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });

    const categoryName = req.body.name;
    let newSlug = category.slug;
    if (categoryName) {
      const existingCategory = await Category.findOne({
        _id: { $ne: id },
        name: { $regex: categoryName, $options: "i" },
      });

      newSlug = slugify(req.body.name, { lower: true });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message:
            "Danh mục trùng tên đã tồn tại, vui lòng nhập lại tên danh mục",
        });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { ...req.body, slug: newSlug },
      {
        new: true,
      }
    );

    return res.json({
      success: updatedCategory ? true : false,
      updatedCategory: updatedCategory
        ? updatedCategory
        : "Cập nhật danh mục thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

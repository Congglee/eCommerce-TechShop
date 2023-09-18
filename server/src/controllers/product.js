import Product from "../models/product.js";
import Category from "../models/category.js";
import slugify from "slugify";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.js";

const createProduct = async (req, res) => {
  try {
    const thumb = req?.files?.thumb?.[0]?.path;
    const images = req.files?.images?.map((item) => item.path);

    if (thumb) req.body.thumb = thumb;
    if (images) req.body.images = images;

    const { error } = createProductSchema.validate(req.body, {
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

    const productName = req.body.name;
    const existingProduct = await Product.findOne({
      name: { $regex: productName, $options: "i" },
    });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "Sản phẩm có cùng tên đã tồn tại, vui lòng nhập lại tên sản phẩm",
      });
    }

    const newProduct = await Product.create(req.body);

    return res.status(200).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "Thêm mới sản phẩm thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const files = req?.files;

    if (files?.thumb) req.body.thumb = files.thumb[0]?.path;
    if (files?.images) req.body.images = files.images?.map((item) => item.path);

    const { error } = updateProductSchema.validate(req.body, {
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
    const { category: newCategory } = req.body;

    const product = await Product.findById(id);
    if (!product) throw new Error("Không tìm thấy sản phẩm");

    const oldCategory = product.category;

    if (oldCategory && oldCategory.toString() !== newCategory) {
      const oldCategoryProducts = await Category.findById(oldCategory);
      if (oldCategoryProducts) {
        oldCategoryProducts.products = oldCategoryProducts.products.filter(
          (productId) => productId.toString() !== id
        );

        await oldCategoryProducts.save();
      } else {
        return res.status(400).json({
          success: false,
          message: `Không tìm thấy danh mục cũ: ${oldCategory}`,
        });
      }
    }

    const productName = req.body.name;
    let newSlug = product.slug;
    if (productName) {
      const existingProduct = await Product.findOne({
        _id: { $ne: id },
        name: { $regex: productName, $options: "i" },
      });

      newSlug = slugify(req.body.name, { lower: true });

      if (existingProduct) {
        return res.status(400).json({
          success: false,
          messages:
            "Sản phẩm trùng tên đã tồn tại, vui lòng nhập lại tên sản phẩm",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body, slug: newSlug },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: updatedProduct ? true : false,
      updatedProduct: updatedProduct
        ? updatedProduct
        : "Cập nhật sản phẩm thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findById(id);

    if (!deleteProduct) throw new Error("Không tìm thấy sản phẩm");

    await Category.findByIdAndUpdate(deleteProduct.category, {
      $pull: { products: id },
    });

    const deletedProduct = await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: deletedProduct ? true : false,
      message: "Xóa sản phẩm thành công",
      deletedProduct: deletedProduct
        ? deletedProduct
        : "Xóa sản phẩm không thành công",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name");

    if (product) {
      return res.status(200).json({
        success: true,
        productData: product,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug })
      .populate({
        path: "category",
        select: "name slug",
      })
      .populate({
        path: "ratings.postedBy",
        select: "name avatar",
      });

    if (product) {
      return res.status(200).json({
        success: true,
        productData: product,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
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

    if (queries?.category) {
      const category = await Category.findOne({
        slug: queries.category.toLowerCase(),
      });
      if (category) {
        formattedQueries.category = category._id;
      } else {
        return res.status(200).json({
          success: false,
          totalPages: 0,
          totalProduct: 0,
          products: [],
        });
      }
    }

    let brandQueryObject = {};
    if (queries?.brand) {
      delete formattedQueries.brand;
      const brandArr = queries.brand?.split(",");
      const brandQuery = brandArr.map((item) => ({
        brand: { $regex: item, $options: "i" },
      }));
      brandQueryObject = { $or: brandQuery };
    }

    const query = { ...brandQueryObject, ...formattedQueries };

    let queryCommand = Product.find(query).populate({
      path: "category",
      select: "name slug",
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
    const totalProduct = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProduct / +limit);

    return res.status(200).json({
      success: response ? true : false,
      totalPages,
      totalProduct,
      products: response ? response : "Không lấy được sản phẩm",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

const uploadImagesProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.files) throw new Error("Missing inputs");

    const response = await Product.findByIdAndUpdate(
      id,
      {
        $push: { images: { $each: req.files.map((el) => el.path) } },
      },
      { new: true }
    );

    return res.status(200).json({
      status: response ? true : false,
      updatedProduct: response ? response : "Cannot upload images product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};

const ratings = async (req, res) => {
  try {
    const { _id } = req.user;
    const { star, comment, id, date } = req.body;
    if (!star || !id) {
      return res.status(400).json({
        success: false,
        message: {
          star: "Vui lòng đánh giá sản phẩm",
        },
      });
    }

    const ratingProduct = await Product.findById(id);
    const alreadyRating = ratingProduct?.ratings?.find(
      (item) => item.postedBy.toString() === _id
    );

    if (alreadyRating) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRating },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            "ratings.$.date": date,
          },
        },
        { new: true }
      );
    } else {
      await Product.findByIdAndUpdate(
        id,
        {
          $push: { ratings: { star, comment, postedBy: _id, date } },
        },
        { new: true }
      );
    }

    const updatedProduct = await Product.findById(id);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce(
      (sum, item) => sum + +item.star,
      0
    );

    updatedProduct.totalRatings =
      Math.round((sumRatings * 10) / ratingCount) / 10;
    await updatedProduct.save();

    return res.status(200).json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

export {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getProductById,
  getProductBySlug,
  uploadImagesProducts,
  ratings,
};

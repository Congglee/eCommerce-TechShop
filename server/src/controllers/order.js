import moment from "moment";
import Order from "../models/order.js";
import { generateOrderCode } from "../utils/generateCode.js";

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { cart, payment, address, mobile, date } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      throw new Error(
        "Giỏ hàng của quý khách chưa có sản phẩm, vui lòng hãy chọn mua một sản phẩm"
      );
    }

    let total = 0;
    const products = cart.map((item) => {
      total += item.price * item.cartQuantity;
      return {
        product: item._id,
        count: item.cartQuantity,
      };
    });

    const orderCode = generateOrderCode();

    const createData = {
      orderCode,
      products,
      payment,
      total,
      orderBy: _id,
      address,
      mobile,
      date,
    };

    const response = await Order.create(createData);
    return res.status(200).json({
      success: response ? true : false,
      response: response ? response : "Thêm mới đơn hàng thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, delivery_status, payment_status } = req.body;
    if (
      !status ||
      status?.trim() === "" ||
      delivery_status?.trim() === "" ||
      payment_status?.trim() === ""
    )
      throw new Error("Vui lòng chọn trạng thái cho đơn hàng");

    const response = await Order.findByIdAndUpdate(
      id,
      { status, delivery_status, payment_status },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      response: response ? response : "Cập nhật trạng thái đơn hàng thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatusByClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (status !== "Đã hủy") {
      throw new Error("Chỉ cho phép trạng thái 'Đã hủy'.");
    }

    const response = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      response: response ? response : "Cập nhật trạng thái đơn hàng thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const response = await Order.find({ orderBy: _id }).populate({
      path: "products.product",
      select: "_id name thumb quantity price",
    });

    return res.status(200).json({
      success: response ? true : false,
      response: response
        ? response
        : "Lấy thông tin đơn hàng của user thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = await Order.findById(id)
      .populate({
        path: "products.product",
        select: "_id name thumb quantity price",
      })
      .populate("orderBy", "email name avatar mobile");

    return res.status(200).json({
      success: orderData ? true : false,
      response: orderData
        ? orderData
        : "Lấy chi tiết thông tin đơn hàng của user thất bại",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
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

    if (queries?.orderCode)
      formattedQueries.orderCode = { $regex: queries.orderCode, $options: "i" };

    if (queries?.orderStatus) {
      delete formattedQueries.orderStatus;
      formattedQueries.status = queries.orderStatus;
    }

    let queryCommand = Order.find(formattedQueries)
      .populate({
        path: "products.product",
        select: "_id name thumb quantity price",
      })
      .populate("orderBy", "email avatar name");

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
    const totalOrder = await Order.countDocuments(formattedQueries);
    const totalPages = Math.ceil(totalOrder / +limit);

    return res.status(200).json({
      success: response ? true : false,
      totalPages,
      totalOrder,
      orders: response ? response : "Không lấy được đơn hàng",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrdersStat = async (req, res) => {
  try {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set("date", 7)
      .format("YYYY-MM-DD HH:mm:sss");

    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrdersIncomeStat = async (req, res) => {
  try {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set("date", 7)
      .format("YYYY-MM-DD HH:mm:sss");

    const ordersIncome = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      ordersIncome,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const get1WeekOrderSales = async (req, res) => {
  try {
    const last7Days = moment()
      .day(moment().day() - 7)
      .format("YYYY-MM-DD HH:mm:sss");

    const weekSalesOrders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(last7Days) } },
      },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      weekSalesOrders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createOrder,
  updateOrderByAdmin,
  updateStatusByClient,
  getUserOrder,
  getOrders,
  getOrder,
  getOrdersStat,
  getOrdersIncomeStat,
  get1WeekOrderSales,
};

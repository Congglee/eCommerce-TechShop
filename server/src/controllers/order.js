import Order from "../models/order.js";
import User from "../models/user.js";

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    // const userCart = await User.findById(_id)
    //   .select("cart")
    //   .populate("cart.product", "title price");
    const { cart, payment, address, mobile, date } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      throw new Error(
        "Giỏ hàng của quý khách chưa có sản phẩm, vui lòng hãy chọn mua một sản phẩm"
      );
    }

    let total = 0;
    const products = cart.map((item) => {
      total += item.price * item.quantity;
      return {
        product: item._id,
        count: item.quantity,
      };
    });

    const createData = {
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

const updateStatusByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) throw new Error("Vui lòng chọn trạng thái cho đơn hàng");

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
      .populate("orderBy", "email");

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
    const response = await Order.find();

    return res.status(200).json({
      success: response ? true : false,
      response: response ? response : "Lấy danh sách đơn hàng thất bại",
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
  updateStatusByAdmin,
  updateStatusByClient,
  getUserOrder,
  getOrders,
  getOrder,
};

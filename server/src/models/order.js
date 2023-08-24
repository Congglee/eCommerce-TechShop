import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
    },
  ],
  status: {
    type: String,
    default: "Đang xử lý",
    enum: ["Đã hủy", "Đang xử lý", "Thành công"],
  },
  delivery_status: {
    type: String,
    default: "Chưa xử lý",
    enum: ["Chưa xử lý", "Đang xử lý", "Đang giao", "Giao thành công"],
  },
  payment_status: {
    type: String,
    default: "Chưa thanh toán",
    enum: ["Chưa thanh toán", "Đã thanh toán"],
  },
  total: Number,
  date: {
    type: String,
  },
  address: {
    type: String,
  },
  mobile: {
    type: String,
  },
  payment: {
    type: String,
    enum: [
      "Thanh toán khi nhận hàng",
      "Thanh toán qua STK ngân hàng",
      "Thanh toán qua cổng Stripe",
    ],
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//Export the model
export default mongoose.model("Order", orderSchema);

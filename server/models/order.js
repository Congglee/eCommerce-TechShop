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
      "Thanh toán bằng Paypal",
    ],
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//Export the model
export default mongoose.model("Order", orderSchema);

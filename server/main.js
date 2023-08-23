import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

import productRoute from "./routers/product.js";
import categoryRoute from "./routers/category.js";
import userRoute from "./routers/user.js";
import orderRoute from "./routers/order.js";
import stripePayment from "./routers/stripe.js";

const app = express();

const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", userRoute);
app.use("/api", orderRoute);
app.use("/api/stripe", stripePayment);

mongoose
  .connect("mongodb://localhost:27017/ecommerce-techshop")
  .then(() => console.log("DB connected"));

app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});

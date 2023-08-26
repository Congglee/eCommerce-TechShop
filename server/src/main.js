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

const corsOptions = {
  origin: ["https://ecommerce-techshop.vercel.app", "http://localhost:5173"], // or "*", to allow all origins
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", userRoute);
app.use("/api", orderRoute);
app.use("/api/stripe", stripePayment);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"));

app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});

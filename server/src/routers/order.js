import express from "express";
import {
  createOrder,
  get1WeekOrderSales,
  getOrder,
  getOrders,
  getOrdersIncomeStat,
  getOrdersStat,
  getUserOrder,
  updateOrderByAdmin,
  updateStatusByClient,
} from "../controllers/order.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/orders/user", [verifyAccessToken], getUserOrder);
router.get("/orders/user/:id", [verifyAccessToken], getOrder);
router.get("/orders/admin", [verifyAccessToken, isAdminRole], getOrders);
router.get("/orders/stats", [verifyAccessToken, isAdminRole], getOrdersStat);
router.get(
  "/orders/income/stats",
  [verifyAccessToken, isAdminRole],
  getOrdersIncomeStat
);
router.get(
  "/orders/weeksales",
  [verifyAccessToken, isAdminRole],
  get1WeekOrderSales
);

router.post("/orders", [verifyAccessToken], createOrder);
router.put(
  "/orders/admin/status/:id",
  [verifyAccessToken, isAdminRole],
  updateOrderByAdmin
);
router.put(
  "/orders/user/status/:id",
  [verifyAccessToken],
  updateStatusByClient
);

export default router;

import express from "express";
import {
  register,
  login,
  logOut,
  getUsers,
  getUser,
  deleteUser,
  updateCart,
  updateUserByClient,
  updateUserByAdmin,
  getCurrentUser,
  removeProductInCart,
  updateCarts,
  updateUserOrder,
} from "../controllers/user.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";
import uploadCloud from "../config/cloudinary.config.js";

const router = express.Router();

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/logOut", logOut);

router.get("/users", [verifyAccessToken, isAdminRole], getUsers);
router.get("/users/id/:id", verifyAccessToken, getUser);
router.get("/users/currentUser", verifyAccessToken, getCurrentUser);

router.put(
  "/users/updateClient",
  verifyAccessToken,
  uploadCloud.single("avatar"),
  updateUserByClient
);
router.put("/users/updateUserOrder", verifyAccessToken, updateUserOrder);
router.put(
  "/users/updateAdmin/:id",
  [verifyAccessToken, isAdminRole],
  updateUserByAdmin
);
router.put("/users/updateCart", [verifyAccessToken], updateCart);
router.put("/users/updateCarts", [verifyAccessToken], updateCarts);
router.delete(
  "/users/removeCart/:id",
  [verifyAccessToken],
  removeProductInCart
);
router.delete("/users/:id", [verifyAccessToken, isAdminRole], deleteUser);

export default router;

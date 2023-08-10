import User from "../models/user.js";
import {
  loginSchema,
  registerSchema,
  updateUserAdminSchema,
  updateUserSchema,
} from "../schemas/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/jwt.js";

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((errItem) => errItem.message);
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }
    const { email } = req.body;
    const checkMail = await User.findOne({ email });
    if (checkMail) throw new Error("Người dùng đã tồn tại!");
    else {
      const newUser = await User.create(req.body);
      return res.status(200).json({
        success: newUser ? true : false,
        message: newUser
          ? "Đăng ký thành công. Vui lòng đăng nhập"
          : "Đã xảy ra sự cố",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Đăng ký tài tài khoản thất bại! ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((errItem) => errItem.message);
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { email, password } = req.body;
    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
      const { password, isAdmin, refreshToken, ...userData } =
        response.toObject();

      const accessToken = generateAccessToken(response);
      const newRefreshToken = generateRefreshToken(response);

      await User.findByIdAndUpdate(
        response._id,
        {
          refreshToken: newRefreshToken,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        accessToken,
        userData,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Thông tin đăng nhập không hợp lệ! ${error.message}`,
    });
  }
};

const logOut = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");

  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
  });
};

const getCurrentUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).select(
      "-refreshToken -password -isAdmin"
    );
    return res.status(200).json({
      success: user ? true : false,
      userData: user ? user : "Không tìm thấy tài khoản người dùng",
    });
  } catch (error) {
    return res.status(400).status({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -isAdmin");

    return res.status(200).json({
      success: user ? true : false,
      userData: user ? user : "Không tìm thấy tài khoản",
    });
  } catch (error) {
    return res.status(400).status({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find().select("-password -refreshToken");

    return res.status(200).json({
      success: user ? true : false,
      users: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi server: " + error.message, success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: deleteUser ? true : false,
      deletedUser: deleteUser
        ? `Xóa tài khoản với email ${deleteUser.email} thành công`
        : "Xóa tài khoản thất bại, không tìm thấy tài khoản người dùng",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserByClient = async (req, res) => {
  try {
    const { error } = updateUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((errItem) => errItem.message);
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { _id } = req.user;

    const { email } = req.body;
    const checkEmail = await User.findOne({
      _id: { $ne: _id },
      email,
    });
    if (checkEmail)
      return res.status(401).json({
        success: false,
        message: "Email đã tồn tại, vui lòng nhập lại email khác!",
      });

    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-password -isAdmin");

    // const avatarFile = req.file;
    // if (avatarFile) {
    //   updateUser.avatar = avatarFile.path;
    // }
    // await updateUser.save();

    return res.status(200).json({
      success: updateUser ? true : false,
      updatedUser: updateUser
        ? updateUser
        : "Cập nhật thông tin tài khoản thất bại",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserByAdmin = async (req, res) => {
  try {
    const { error } = updateUserAdminSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((errItem) => errItem.message);
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { id } = req.params;

    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password -refreshToken");

    return res.status(200).json({
      success: updateUser ? true : false,
      updatedUser: updateUser
        ? updateUser
        : "Cập nhật thông tin tài khoản thất bại",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id, quantity } = req.body;
    if (!id || !quantity)
      throw new Error("Vui lòng điền vào id và số lượng sản phẩm");

    const user = await User.findById(_id).select("cart");
    const alreadyProduct = user.cart.find(
      (item) => item.product.toString() === id
    );
    if (alreadyProduct) {
      const response = await User.updateOne(
        {
          cart: { $elemMatch: alreadyProduct },
        },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedUserCart: response
          ? response
          : "Không thể thêm sản phẩm vào giỏ hàng",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: { cart: { product: id, quantity } },
        },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedUserCart: response
          ? response
          : "Không thể thêm sản phẩm vào giỏ hàng",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  register,
  login,
  logOut,
  getUser,
  getCurrentUser,
  getUsers,
  updateUserByAdmin,
  updateUserByClient,
  deleteUser,
  updateCart,
};

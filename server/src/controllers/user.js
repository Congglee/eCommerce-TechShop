import User from "../models/user.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateUserAdminSchema,
  updateUserSchema,
} from "../schemas/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/jwt.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import crypto from "crypto";
import makeToken from "uniqid";

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, {
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

    const { email } = req.body;
    const checkMail = await User.findOne({ email });
    if (checkMail) {
      throw new Error(
        `Email ${email} đã được sử dụng, vui lòng sử dụng email khác`
      );
    } else {
      const token = makeToken();
      const emailEdited = btoa(email) + "@" + token;
      const newUser = new User({
        ...req.body,
        email: emailEdited,
      });
      await newUser.save();

      if (newUser) {
        const html = `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
             <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="font-size: 24px; color: #333;">Xác nhận đăng ký tài khoản</h2>
            </div>
            <div style="font-size: 16px; color: #555;">
              <p>Cảm ơn bạn đã đăng ký tài khoản với Digital World 2. Vui lòng sử dụng mã OTP sau để xác nhận tài khoản:</p>
            <div style="font-size: 20px; color: #00a8e8; padding: 10px; background-color: #f0f0f0; border-radius: 5px; margin-top: 10px;">${token}</div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #888;">
              <p>Nếu bạn không định đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
            </div>
        </div>`;
        await sendMail({
          email,
          html,
          subject: "Xác nhận đăng ký tài khoản Digital World 2",
        });
      }

      setTimeout(async () => {
        await User.deleteOne({ email: emailEdited });
      }, [300000]);

      return res.status(200).json({
        success: newUser ? true : false,
        message: newUser
          ? "Vui lòng kiểm tra email của bạn để kích hoạt tài khoản"
          : "Đã có lỗi xảy ra, vui lòng thử lại",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const finalRegister = async (req, res) => {
  try {
    const { token } = req.params;
    const notActiveEmail = await User.findOne({
      email: new RegExp(`${token}$`),
    });

    if (notActiveEmail) {
      notActiveEmail.email = atob(notActiveEmail?.email?.split("@")[0]);
      notActiveEmail.save();
    }

    return res.status(200).json({
      success: notActiveEmail ? true : false,
      message: notActiveEmail
        ? "Đăng ký tài khoản thành công, vui lòng đăng nhập"
        : "Đã có lỗi xảy ra, vui lòng thử lại sau",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body, {
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

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

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

const refreshAccessToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("Không tìm thấy refresh token trong cookie");

  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookie.refreshToken,
  });

  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.isAdmin)
      : "Refresh token không hợp lệ",
  });
};

const logOut = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken)
      throw new Error("Không tìm thấy refresh token trong cookie");

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
  } catch (error) {
    return res.status(400).status({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .select("-refreshToken -password -isAdmin")
      .populate({
        path: "cart.product",
        select: "_id name quantity thumb price",
      });

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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email không được để trống");

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Email chưa được đăng ký",
      });

    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="font-size: 24px; color: #333;">Quên mật khẩu</h2>
      </div>
      <div style="font-size: 16px; color: #555;">
        <p style="margin-bottom: 20px;">Vui lòng click vào liên kết bên dưới để thay đổi mật khẩu của bạn. Liên kết này sẽ hết hạn sau 15 phút kể từ bây giờ.</p>
        <a href="${process.env.CLIENT_URL}/resetpassword/${resetToken}" style="display: inline-block; background-color: #00a8e8; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Click vào đây để đặt lại mật khẩu của bạn</a>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #888;">
        <p>Nếu bạn không định đặt lại mật khẩu này, vui lòng bỏ qua email này.</p>
      </div>
    </div>`;

    const data = {
      email,
      html,
      subject: "Quên mật khẩu",
    };

    const result = await sendMail(data);
    return res.status(200).json({
      success: result.response?.includes("OK") ? true : false,
      message: result.response?.includes("OK")
        ? "Vui lòng xác thực lấy lại mật khẩu trong email"
        : "Đã có lỗi xảy ra, vui lòng thử lại sau",
    });
  } catch (error) {
    return res.status(400).status({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body, {
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

    const { token, password } = req.body;
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).status({
        success: false,
        message: "Reset token không hợp lệ",
      });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: user ? true : false,
      message: user
        ? "Thay đổi mật khẩu thành công"
        : "Thay đổi mật khẩu thất bại",
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
      const errors = error.details.reduce((acc, errItem) => {
        acc[errItem.path[0]] = errItem.message;
        return acc;
      }, {});
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { _id } = req.user;
    const { email, mobile } = req.body;
    const checkEmail = await User.findOne({
      _id: { $ne: _id },
      email,
    });
    if (checkEmail) {
      return res.status(401).json({
        success: false,
        message: "Email đã tồn tại, vui lòng nhập lại email khác!",
      });
    }

    if (mobile) {
      const checkMobile = await User.findOne({
        _id: { $ne: _id },
        mobile,
      });
      if (checkMobile) {
        return res.status(401).json({
          success: false,
          message:
            "Số điện thoại đã tồn tại, vui lòng nhập lại số điện thoại khác!",
        });
      }
    }

    const allowedAvatarFileExtensions = ["jpg", "jpeg", "png", "webp"];
    const allowedAvatarFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    const avatarFile = req.file;

    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-password -isAdmin");

    if (avatarFile) {
      const fileExtension = avatarFile.originalname
        .split(".")
        .pop()
        .toLowerCase();
      if (!allowedAvatarFileExtensions.includes(fileExtension)) {
        return res.status(400).json({
          success: false,
          message: {
            avatar:
              "File ảnh avatar không hợp lệ. Chỉ cho phép các file JPG, JPEG, PNG hoặc WEBP",
          },
        });
      }

      if (avatarFile.size > allowedAvatarFileSize) {
        return res.status(400).json({
          success: false,
          message: {
            avatar: "Kích thước file ảnh phải nhỏ hơn 5Mb",
          },
        });
      }

      updateUser.avatar = avatarFile.path;
    }

    await updateUser.save();
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

const updateUserOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { address, mobile } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateUser = {};

    if (address && !user.address) {
      updateUser.address = address;
    }

    const checkPhone = await User.findOne({
      _id: { $ne: _id },
      mobile,
    });
    if (mobile) {
      if (checkPhone) {
        return res.status(400).json({
          success: false,
          message:
            "Số điện thoại đã được sử dụng, vui lòng sử dụng số điện thoại khác",
        });
      } else if (!user.mobile) {
        updateUser.mobile = mobile;
      }
    }

    if (Object.keys(updateUser).length > 0) {
      await User.findByIdAndUpdate(_id, updateUser);
    }

    return res.status(200).json({
      success: true,
      message:
        "Địa chỉ và điện thoại di động của người dùng được cập nhật nếu cần",
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
    const { id, quantity = 1 } = req.body;
    if (!id || !quantity)
      throw new Error("Vui lòng điền vào id và số lượng sản phẩm");

    const user = await User.findById(_id).select("cart");
    const alreadyProduct = user.cart.find(
      (item) => item.product.toString() === id
    );

    if (alreadyProduct) {
      let newQuantity = quantity;
      newQuantity = alreadyProduct.quantity + +newQuantity;

      const response = await User.updateOne(
        {
          cart: { $elemMatch: alreadyProduct },
        },
        { $set: { "cart.$.quantity": newQuantity } },
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

const removeProductInCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id).select("cart");
    const alreadyProduct = user.cart.find(
      (item) => item.product.toString() === id
    );
    if (!alreadyProduct) {
      return res.status(500).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }

    const response = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { cart: { product: id } },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      updatedUserCart: response
        ? "Xóa sản phẩm trong giỏ hàng thành công"
        : "Không thể xóa sản phẩm trong giỏ hàng",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCarts = async (req, res) => {
  try {
    const { _id } = req.user;
    const { cart } = req.body;

    const user = await User.findById(_id).select("cart");

    for (const submittedCartItem of cart) {
      const existingCartItemIndex = user.cart.findIndex(
        (item) => item.product.toString() === submittedCartItem.product
      );

      if (existingCartItemIndex !== -1) {
        if (submittedCartItem.quantity === 1) {
          user.cart[existingCartItemIndex].quantity += 1;
        } else {
          user.cart[existingCartItemIndex].quantity +=
            submittedCartItem.quantity;
        }
      } else {
        user.cart.push(submittedCartItem);
      }
    }

    const updatedUserCart = await user.save();

    return res.status(200).json({
      success: true,
      message: "Giỏ hàng được cập nhật thành công",
      updatedUserCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  register,
  finalRegister,
  login,
  refreshAccessToken,
  logOut,
  getUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  getUsers,
  updateUserByAdmin,
  updateUserByClient,
  deleteUser,
  updateCart,
  removeProductInCart,
  updateCarts,
  updateUserOrder,
};

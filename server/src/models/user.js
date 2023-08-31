import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/user-profile-icon-trendy-flat-260nw-1923506948.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    refreshToken: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
    registerToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};

//Export the model
export default mongoose.model("User", userSchema);

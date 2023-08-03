import mongoose from "mongoose";

var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: "name",
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Category", categorySchema);

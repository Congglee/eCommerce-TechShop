import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Set Cloudinary configuration parameters using config . method
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// console.log(process.env.CLOUDINARY_KEY);

// Set middleware multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg", "webp"],
  params: {
    folder: "ecommerce-techshop",
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;

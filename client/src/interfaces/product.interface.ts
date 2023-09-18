import { ICategory } from "./category.interface";
import { IUser } from "./user.interface";

interface IRating {
  _id: string;
  star: number;
  postedBy: IUser;
  comment: string;
  date: string;
}

type ProductCategory = ICategory | string;

export interface IProduct {
  _id: string;
  name: string;
  slug?: string;
  thumb: string;
  images: string[];
  price: number;
  quantity: number;
  ratings?: IRating[];
  totalRatings?: number;
  brand: string;
  description?: string;
  sold?: number;
  category: ProductCategory;
  updatedAt?: string;
}

export interface ICartItem extends IProduct {
  cartQuantity: number;
}

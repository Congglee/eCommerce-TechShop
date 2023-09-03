import { ICategory } from "./category.interface";
import { IUser } from "./user.interface";

interface IRating {
  _id: string;
  star: number;
  postedBy: string | IUser;
  comment: string;
  date: string;
}
export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  thumb: string;
  images: string[];
  price: number;
  quantity: number;
  ratings: IRating[];
  totalRatings: number;
  description: string;
  categoryId: ICategory | string;
}

export interface ICartItem extends IProduct {
  cartQuantity: number;
}

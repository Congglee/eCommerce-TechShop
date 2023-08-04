import { ICategory } from "./category.interface";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  thumb: string;
  images: string[];
  price: number;
  description: string;
  categoryId: ICategory | string;
}

import { IProduct } from "./product.interface";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  products: IProduct[];
}

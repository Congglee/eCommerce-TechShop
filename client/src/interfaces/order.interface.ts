import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IOrder {
  _id: string;
  products: IProduct[];
  status: string;
  total: number;
  payment: string;
  orderBy: IUser;
  address: string;
  mobile: string;
}

import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IOrder {
  _id: string;
  orderCode: string;
  products: { count: number; product: IProduct }[];
  status: string;
  total: number;
  payment: string;
  orderBy: IUser | string;
  address: string;
  mobile: string;
  date: string;
  delivery_status: string;
  payment_status: string;
  updatedAt?: string;
}

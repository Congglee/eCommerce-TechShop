export interface ICategory {
  _id: string;
  name: string;
  slug?: string;
  brand: string[];
  // products?: IProduct[];
  createdAt?: string;
}

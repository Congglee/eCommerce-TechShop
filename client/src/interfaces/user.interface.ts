export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string | File;
  isAdmin?: boolean;
  isBlocked?: boolean;
  // cart?: IProduct[] | [];
  refreshToken?: string;
  address?: string;
  mobile?: string;
  createdAt?: string;
}

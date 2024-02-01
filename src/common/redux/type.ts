import { ICategory } from "../category";
import { IProduct } from "../products";
import { IUser } from "../users";

export interface initialProduct {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  products: IProduct[] | [];
  product: IProduct | {};
  category: ICategory | {};
}
export interface initialUser {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  users: IUser[] | [];
  user: IUser | {};
}
export interface IStateProduct {
  product: {
    products: IProduct[];
    product: IProduct;
    loading: string;
    category: ICategory;
  };
}
export interface IStateUser {
  user: {
    users: IUser[];
    user: IUser;
    loading: string;
  };
}

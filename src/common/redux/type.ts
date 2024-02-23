import { ICategory } from "../category";
import { ICmt, IProduct } from "../products";
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
export interface initialCmt {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  comments: ICmt[] | [];
  comment: ICmt | {};
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
export interface IStateCmt {
  comment: {
    comments: ICmt[];
    comment: ICmt;
    loading: string;
  };
}

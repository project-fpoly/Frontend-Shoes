import IUser from "../../types/user";
import { ICategory } from "../category";
import { ICmt, IProduct } from "../products";
import { IUsers } from "../users";

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
  totalDocs:number
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
    users: IUsers[];
    user: IUsers;
    loading: string;
  };
}
export interface IStateCmt {
  comment: {
    comments: ICmt[];
    comment: ICmt;
    loading: string;
    totalDocs:number
  };
}

import IUser from "../../types/user";
import { ICategory } from "../category";
import { ICmt, IProduct } from "../products";
import { IUsers } from "../users";


export interface initialProduct {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  products: IProduct[] | [];
  product: IProduct | "";
  category: ICategory | "";
  totalProducts: number
}
export interface initialUser {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  users: IUser[] | [];
  user: IUser | "";
  totalDocs: number
}
export interface initialCmt {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  comments: ICmt[] | [];
  comment: ICmt | "";
  totalDocs: number
}
export interface initialCategory {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  categories: ICategory[] | [];
  category: ICategory | "";
  totalDocs: number
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
    totalDocs: number
  };
}
export interface IStateCmt {
  comment: {
    comments: ICmt[];
    comment: ICmt;
    loading: string;
    totalDocs: number
  };
}
export interface IStateCategory {
  category: {
    categories: ICategory[];
    category: ICategory;
    loading: "idle" | "pending" | "fulfilled" | "failed";
    totalDocs: number;
  };
}
import IUser from "../../types/user";
import { ICategory } from "../category";
import { UserChatByEmail } from "../chat";
import { INotification } from "../notification";
import { ICmt, IProduct } from "../products";
import { ISale } from "../sale";
import { IUsers } from "../users";
import { IVoucher } from "../voucher";

export interface initialProduct {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  products: IProduct[] | [];
  product: IProduct | {};
  category: ICategory | {};
  totalProducts: number;
  comments?: [];
  loadingSearch: "idle" | "pending" | "fulfilled" | "failed";
  isDeleted: boolean;
}
export interface initialUser {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  users: IUser[] | [];
  user: IUser | "";
  totalDocs: number;
}
export interface initialVoucher {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  vouchers: IVoucher[] | [];
  voucher: IVoucher | "";
}
export interface initialChart {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  list: any[] | [];
  data: any[] | [];
}
export interface initialSale {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  sales: ISale[] | [];
  sale: ISale | "";
  totalDocs: number;
}
export interface initialCmt {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  comments: ICmt[] | [];
  comment: ICmt | "";
  totalDocs: number;
  checked?: []
}
export interface initialChat {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  userChat: UserChatByEmail;
}
export interface initialCategory {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  categories: ICategory[] | [];
  category: ICategory | "";
  totalDocs: number;
}
export interface initialNotification {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  notifications: INotification[] | [];
  notification: INotification | "";
  listSend: INotification[] | []
}
export interface IStateProduct {
  product: {
    data: IProduct[];
    products: IProduct[];
    product: IProduct;
    loading: string;
    category: ICategory;
    totalProducts: number;
    loadingSearch: string;
    isDeleted: boolean;
  };
}
export interface IStateUser {
  user: {
    users: IUsers[];
    user: IUsers;
    loading: string;
    totalDocs: number;
  };
}
export interface IStateVoucher {
  voucher: {
    vouchers: IVoucher[];
    voucher: IVoucher;
    loading: string;
    totalDocs: number;
  };
}
export interface IStateChart {
  chart: {
    list: any[];
    data: any[];
    loading: string;
  };
}
export interface IStateSale {
  sale: {
    sales: ISale[];
    sale: ISale;
    loading: string;
    totalDocs: number;
  };
}
export interface IStateCmt {
  comment: {
    comments: ICmt[];
    comment: ICmt;
    loading: string;
    totalDocs: number;
  };
}
export interface IStateNotification {
  notification: {
    notifications: INotification[];
    notification: INotification;
    loading: "idle" | "pending" | "fulfilled" | "failed";
    totalDocs: number;
    listSend: INotification[]
  };
}
export interface IStateChat {
  chat: {
    loading: "idle" | "pending" | "fulfilled" | "failed";
    userChat: UserChatByEmail;
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

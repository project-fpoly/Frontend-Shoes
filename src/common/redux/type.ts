import { IProduct } from "../products";

export interface initialProduct {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  products: IProduct[] | [];
  product: IProduct | {};
}
export interface IStateProduct {
  product: {
    products: IProduct[];
    loading: string;
  };
}

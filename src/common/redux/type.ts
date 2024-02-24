import { ICategory } from "../category";
import { IProduct } from "../products";

export interface initialProduct {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  products: IProduct[] | [];
  product: IProduct | {};
  category: ICategory | {};
}
export interface IStateProduct {
  product: {
    data: IProduct[];
    products: IProduct[];
    product: IProduct;
    loading: string;
    category: ICategory;
  };
}

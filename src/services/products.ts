import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
export const getProducts = async () => {
  try {
    const respone: AxiosResponse<IProduct> = await instance.get("/products");
    console.log(respone);

    return respone.data || respone;
  } catch (error: any) {
    console.log(error.code);
  }
};

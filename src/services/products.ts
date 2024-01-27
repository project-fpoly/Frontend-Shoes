import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
export const getProducts = async () => {
  try {
    const respone: AxiosResponse<IProduct> = await instance.get("/shoe");
    return respone.data || respone;
  } catch (error: any) {
    console.log(error.code);
  }
};

export const getCategories = async () => {
  try {
    const respone: AxiosResponse = await instance.get("/Categories");
    console.log(respone);
    return respone.data || respone;
  } catch (error: any) {
    console.log(error.code);
  }
};

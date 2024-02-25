import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
export const getProducts = async () => {
  try {
    const respone: AxiosResponse<IProduct[]> = await instance.get(
      "/api/product"
    );
    console.log(respone);

    return respone;
  } catch (error: any) {
    console.log(error.code);
  }
};
export const getProductById = async (id: string) => {
  try {
    const respone: AxiosResponse<IProduct> = await instance.get(
      `/api/product/${id}`
    );

    return respone.data || respone;
  } catch (error: any) {
    console.log(error.code);
  }
};

export const getCategories = async () => {
  try {
    const respone: AxiosResponse = await instance.get("/api/categories");
    return respone.data || respone;
  } catch (error: any) {
    console.log(error.code);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const respone: AxiosResponse<any> = await instance.get(
      `/api/categories/${id}`
    );

    return respone.data || respone;
  } catch (error: any) {
    console.log(error.code);
  }
};

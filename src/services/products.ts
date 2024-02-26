import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import { CustomError } from "../common/error";

export const getProducts = async () => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get("/api/product");
    return response.data.data || response;
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching products.");
  }
};

export const getProductById = async (id: number) => {
  try {
    const response: AxiosResponse<IProduct> = await instance.get(`/shoe/${id}`);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage = customError.response?.data?.message || "Error while fetching product by ID.";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching product by ID.");
  }
};

export const getCategories = async () => {
  try {
    const response: AxiosResponse = await instance.get("/Categories");
    console.log(response);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage = customError.response?.data?.message || "Error while fetching categories.";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching categories.");
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const response: AxiosResponse = await instance.get(`/Categories/${id}`);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage = customError.response?.data?.message || "Error while fetching category by ID.";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching category by ID.");
  }
};
import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import { CustomError } from "../common/error";

export const getProducts = async (
  page = 1,
  pageSize = 10,
  searchKeyword = ""
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?page=${page}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`
    );
    return response?.data || response;
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching products.");
  }
};

export const getProductById = async (id: string) => {
  try {
    const response: AxiosResponse<IProduct> = await instance.get(
      `/api/product/${id}`
    );
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching product by ID.";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching product by ID.");
  }
};
export const addProduct = async (
  product: IProduct
): Promise<IProduct | null> => {
  try {
    const response: AxiosResponse<IProduct> = await instance.post(
      "/api/product",
      product
    );
    notification.success({ message: "Product added successfully" });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while adding product.";
    notification.error({ message: errorMessage });
    throw new Error("Error while adding product.");
  }
};

export const updatePrroduct = async (
  id: string,
  product: IProduct
): Promise<IProduct | null> => {
  try {
    const response: AxiosResponse<IProduct> = await instance.put(
      `/api/product/${id}`,
      product
    );
    notification.success({ message: "Product updated successfully" });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while updating product.";
    notification.error({ message: errorMessage });
    throw new Error("Error while updating product.");
  }
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    const response: AxiosResponse<IProduct> = await instance.delete(
      `/api/product/${id}`
    );
    notification.success({ message: "Product deleted successfully." });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while deleting product.";
    notification.error({ message: errorMessage });
    throw new Error("Error while deleting product.");
  }
};

export const getCategories = async () => {
  try {
    const response: AxiosResponse = await instance.get("api/categories");
    console.log(response);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while fetching categories.";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching categories.");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.get(`api/categories/${id}`);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching category by ID.";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching category by ID.");
  }
};

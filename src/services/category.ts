import instance from "../core/Api";
import { AxiosResponse } from "axios";
import { ICategory } from "../common/category";
import { notification } from "antd";
import { CustomError } from "../common/error";

export const getCategories = async () => {
  try {
    const response: AxiosResponse = await instance.get(`/api/categories`);
    return response.data || response;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching categories.");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.get(`/api/categories/${id}`);
    return response.data || response;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching category by ID.");
  }
};

export const addCategory = async (category: ICategory): Promise<ICategory | null> => {
  try {
    const response: AxiosResponse<ICategory> = await instance.post("/api/categories", category);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage = customError.response?.data?.message || "Error while adding category.";
    notification.error({ message: errorMessage });
    throw new Error("Error while adding category.");
  }
};

export const updateCategory = async (id: string, category: ICategory): Promise<ICategory | null> => {
  try {
    const response: AxiosResponse<ICategory> = await instance.put(`/api/categories/${id}`, category);
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage = customError.response?.data?.message || "Error while updating category.";
    notification.error({ message: errorMessage });
    throw new Error("Error while updating category.");
  }
};

export const deleteCate = async (id: string): Promise<ICategory | null> => {
  try {
    const response: AxiosResponse<ICategory> = await instance.delete(`/api/categories/${id}`);
    notification.success({ message: "Category deleted successfully." });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage = customError.response?.data?.message || "Error while deleting category.";
    notification.error({ message: errorMessage });
    throw new Error("Error while deleting category.");
  }
};
import { AxiosResponse } from "axios";
import instance from "../core/Api";
import { ISale } from "../common/sale";
import { notification } from "antd";
import { CustomError } from "../common/error";

export const getSales = async (page = 1, limit = 10, keyword = "") => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/sale?page=${page}&limit=${limit}&keyword=${keyword}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    );
    return response.data || response;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching Sale.");
  }
};

export const getSaleById = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.get(`/api/sale/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
    return response.data || response;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching campaign by ID.");
  }
};

export const addSale = async (sale: ISale): Promise<ISale | null> => {
  try {
    const response: AxiosResponse<ISale> = await instance.post(
      "/api/sale",
      sale,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    );
    notification.success({ message: "Campaign added successfully" });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while adding campaign.";
    notification.error({ message: errorMessage });
    throw new Error("Error while adding campaign.");
  }
};

export const updateSale = async (
  id: string,
  sale: ISale
): Promise<ISale | null> => {
  try {
    const response: AxiosResponse<ISale> = await instance.put(
      `/api/sale/${id}`,
      sale
    );
    notification.success({ message: "Campaign updated successfully" });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while updating Campaign.";
    notification.error({ message: errorMessage });
    throw new Error("Error while updating Campaign.");
  }
};

export const deleteSale = async (id: string): Promise<ISale | null> => {
  try {
    const response: AxiosResponse<ISale> = await instance.delete(
      `/api/sale/${id}`
    );
    notification.success({ message: "Campaign deleted successfully." });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while deleting Campaign.";
    notification.error({ message: errorMessage });
    throw new Error("Error while deleting Campaign.");
  }
};

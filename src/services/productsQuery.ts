import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import { CustomError } from "../common/error";

//Lọc theo id Category
export const categoryFilterProducts = async (CategoryId: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?categoryFilter=${CategoryId}`
    );
    const data = response.data || [];
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by category";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by category"
    );
  }
};

// Lọc theo size
export const sizeFilterProducts = async (size: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?sizeFilter=${size}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by size successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by size ";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by size "
    );
  }
};

// Lọc theo khoảng giá
export const priceFilterProducts = async (
  minPrice: number,
  maxPrice: number
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?priceFilter=${minPrice}->${maxPrice}`
    );
    const data = response.data || [];
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by price";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by price"
    );
  }
};
// Lọc theo Chất liệu

export const materialFilterProducts = async (material: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?materialFilter=${material}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by material successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by material";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by material"
    );
  }
};

// Lọc theo khoảng ngày ra mắt
export const releaseDateFilterProducts = async (
  startDate: Date,
  endDate: Date
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?releaseDateFilter=${startDate}->${endDate}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by release date successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by release date";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by release date"
    );
  }
};

// Lọc theo màu

export const colorFilterProducts = async (color: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?colorFilter=${color}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by color successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by color";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by color"
    );
  }
};

// sắp xếp theo giá tăng hoặc giảm

export const sortOrderProducts = async (sort: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?sortOrder=${sort}`
    );
    const data = response.data || [];
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been sorted";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching Products have been sorted");
  }
};

// Top 10 views
export const viewsFilterProducts = async (
  pageSize: 10,
  sort: "asc_views" | "desc_views"
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?pageSize=${pageSize}&viewsFilter=${sort}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by views successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by views";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by views"
    );
  }
};

// top 10 đã bán
export const soldFilterProducts = async (
  pageSize: 10,
  sort: "asc_sold" | "desc_sold"
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?pageSize=${pageSize}&soldFilter=${sort}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by sold quantity successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by sold quantity ";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by sold quantity "
    );
  }
};

// Top 10 giảm giá
export const saleFilterProducts = async (
  pageSize: 10,
  sort: "asc_sale" | "desc_sale"
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?pageSize=${pageSize}&saleFilter=${sort}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by sale quantity successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by sale quantity ";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by sale quantity "
    );
  }
};
// Top 10 đánh giá

export const rateFilterProducts = async (
  pageSize: 10,
  sort: "asc_rate" | "desc_rate"
) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?pageSize=${pageSize}&rateFilter=${sort}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by rating successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by rating ";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by rating "
    );
  }
};

/// Search by keyword

export const searchByKeyword = async (keyword: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `/api/product/?searchKeyword=${keyword}`
    );
    const data = response.data || [];
    return data;
  } catch (error) {
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by sale quantity ";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by sale quantity "
    );
  }
};
// ...

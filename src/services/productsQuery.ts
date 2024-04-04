import { IProduct } from "../common/products";
import instance from "../core/Api";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import { CustomError } from "../common/error";

export const getProductsWithFilter = async (
  page: number,
  pageSize: number,
  searchKeyword: string,
  sort?:
    | "asc"
    | "desc"
    | "asc_views"
    | "desc_views"
    | "asc_sold"
    | "desc_sold"
    | "asc_sale"
    | "desc_sale"
    | "asc_rate"
    | "desc_rate",
  categoryId?: string,
  size?: string,
  minPrice?: number,
  maxPrice?: number,
  material?: string,
  startDate?: Date,
  endDate?: Date,
  color?: string,
  gender?: string,
  isDeleted?: boolean
) => {
  try {
    let url = `api/product?page=${page}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`;

    if (sort) {
      if (sort === "asc" || sort === "desc") {
        url += `&sortOrder=${sort}`;
      } else if (sort === "asc_views" || sort === "desc_views") {
        url += `&sortOrder=${sort}`;
      } else if (sort === "asc_sold" || sort === "desc_sold") {
        url += `&sortOrder=${sort}`;
      } else if (sort === "asc_sale" || sort === "desc_sale") {
        url += `&sortOrder=${sort}`;
      } else if (sort === "asc_rate" || sort === "desc_rate") {
        url += `&sortOrder=${sort}`;
      }
    }
    if (categoryId) {
      url += `&categoryFilter=${categoryId}`;
    }
    if (size) {
      url += `&sizeFilter=${size}`;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      url += `&priceFilter=${minPrice}->${maxPrice}`;
    }
    if (material) {
      url += `&materialFilter=${material}`;
    }
    if (startDate && endDate) {
      url += `&releaseDateFilter=${startDate}->${endDate}`;
    }
    if (color) {
      url += `&colorFilter=${color}`;
    }
    if (gender) {
      url += `&genderFilter=${gender}`;
    }
    if (isDeleted) {
      url += `&deleteFilter=${isDeleted}`;
    }

    const response: AxiosResponse = await instance.get(url);
    return response?.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while fetching products";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching products");
  }
};
// Lọc theo Giới tính

export const genderFilterProducts = async (gender: string) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?genderFilter=${gender}`
    );
    return response?.data || response;

  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by gender";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by gender"
    );
  }
};

// fiter Product
export const filterProducts = async (
  pageSize: number,
  sort?:
    | "asc"
    | "desc"
    | "asc_views"
    | "desc_views"
    | "asc_sold"
    | "desc_sold"
    | "asc_sale"
    | "desc_sale"
    | "asc_rate"
    | "desc_rate",
  categoryId?: string,
  size?: string,
  minPrice?: number,
  maxPrice?: number,
  material?: string,
  startDate?: Date,
  endDate?: Date,
  color?: string,
  deleteProduct?: boolean
) => {
  try {
    let url = `api/product?pageSize=${pageSize}`;
    if (sort) {
      if (sort === "asc" || sort === "desc") {
        url += `&sortOrder=${sort}`;
      } else if (sort === "asc_views" || sort === "desc_views") {
        url += `&viewsFilter=${sort}`;
      } else if (sort === "asc_sold" || sort === "desc_sold") {
        url += `&soldFilter=${sort}`;
      } else if (sort === "asc_sale" || sort === "desc_sale") {
        url += `&saleFilter=${sort}`;
      } else if (sort === "asc_rate" || sort === "desc_rate") {
        url += `&rateFilter=${sort}`;
      }
    }
    if (categoryId) {
      url += `&categoryFilter=${categoryId}`;
    }
    if (size) {
      url += `&sizeFilter=${size}`;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      url += `&priceFilter=${minPrice}->${maxPrice}`;
    }
    if (material) {
      url += `&materialFilter=${material}`;
    }
    if (startDate && endDate) {
      url += `&releaseDateFilter=${startDate}->${endDate}`;
    }
    if (color) {
      url += `&colorFilter=${color}`;
    }
    if (deleteProduct) {
      url += `&deleteFilter=${deleteProduct}`;
    }

    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      url
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching filtered products";
    notification.error({ message: errorMessage });
    throw new Error("Error while fetching filtered products");
  }
};
//Lọc theo id Category
export const categoryFilterProducts = async (CategoryId: string) => {
  console.log(CategoryId._id!)
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?categoryFilter=${CategoryId._id}`
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

// Lọc theo tryDelete
export const tryDeleteFilterProducts = async (deleteFilter: boolean) => {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await instance.get(
      `api/product?deleteFilter=${deleteFilter}`
    );
    const data = response.data || [];
    notification.success({
      message: "Success",
      description: "Products have been filtered by deleteFilter successfully.",
    });
    return data;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message ||
      "Error while fetching Products have been filtered by delelte ";
    notification.error({ message: errorMessage });
    throw new Error(
      "Error while fetching Products have been filtered by delelte "
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
    // notification.success({
    //   message: "Success",
    //   description: "Products have been filtered by sale quantity successfully.",
    // });
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
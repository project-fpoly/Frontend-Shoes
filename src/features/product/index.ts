import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProduct } from "../../common/redux/type";
import { IProduct } from "../../common/products";
import {
  getProducts,
  getProductById,
  getCategoryById,
  deleteProduct,
  addProduct,
  updatePrroduct,
} from "../../services/products";
import { getProductsWithFilter } from "../../services/productsQuery";
import { isRejected } from "@reduxjs/toolkit/react";

const initialState: initialProduct = {
  loading: "idle",
  products: [],
  product: "",
  category: "",
  totalProducts: 0,
};

export const getProductsWithFilters = createAsyncThunk(
  "product/getProductsWithFilters",
  async ({
    page, pageSize, searchKeyword, sort, categoryId, size,
    minPrice, maxPrice, material, startDate, endDate, color, gender
  }: {
    page: number,
    pageSize: number;
    searchKeyword: string,
    sort?: "asc" | "desc" | "asc_views" | "desc_views" | "asc_sold" | "desc_sold" | "asc_sale" | "desc_sale" | "asc_rate" | "desc_rate";
    categoryId?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    material?: string;
    startDate?: Date;
    endDate?: Date;
    color?: string;
    gender?: string;
  }) => {
    try {
      const response = await getProductsWithFilter(page, pageSize, searchKeyword, sort, categoryId, size, minPrice, maxPrice, material, startDate, endDate, color, gender);
      console.log(response);
      return response
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu");
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async ({
    page,
    pageSize,
    searchKeyword,
  }: {
    page: number;
    pageSize: number;
    searchKeyword: string;
  }) => {
    try {
      const respone = await getProducts(page, pageSize, searchKeyword);
      return respone;
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu");
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id: string, thunkApi) => {
    try {
      const respone = await getProductById(id);
      thunkApi.dispatch(
        fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: "" })
      );
      thunkApi.dispatch(fetchCategoryById(respone?.categoryId!));
      return respone;
    } catch (error) {
      return isRejected("Error fetching data");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, thunkApi) => {
    try {
      const response = await deleteProduct(id);
      thunkApi.dispatch(
        fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: "" })
      );
      return response;
    } catch (error) {
      throw new Error("Lỗi khi xóa sản phẩm");
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (newProduct: IProduct, thunkApi) => {
    try {
      const response = await addProduct(newProduct);
      thunkApi.dispatch(
        fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: "" })
      );
      return response;
    } catch (error) {
      throw new Error("Error create Product");
    }
  }
);

export const update = createAsyncThunk(
  "product/updateProduct",
  async (
    { id, newProduct }: { id: string; newProduct: IProduct },
    thunkApi
  ) => {
    try {
      const response = await updatePrroduct(id, newProduct);
      thunkApi.dispatch(
        fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: "" })
      );
      return response;
    } catch (error) {
      throw new Error("Error updating Product");
    }
  }
);
export const fetchCategoryById = createAsyncThunk(
  "product/fetchCategoryById",
  async (id: string) => {
    try {
      const respone = await getCategoryById(id);
      return respone;
    } catch (error) {
      return isRejected("Error fetching data");
    }
  }
);

/// đây là chỗ chọc vào kho để lấy db
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //fetch product
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.totalProducts = action.payload.totalProducts;
    });
    //fetch product
    builder.addCase(getProductsWithFilters.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getProductsWithFilters.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(getProductsWithFilters.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.totalProducts = action.payload.totalProducts;
    });
    // get one Product
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload) ? action.payload : [];
      state.totalProducts = state.products.length;
    });
    // add product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload) ? action.payload : [];
      state.totalProducts = state.products.length;
    });
    //update product
    builder.addCase(update.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(update.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload) ? action.payload : [];
      state.totalProducts = state.products.length;
    });
    // remove product
    builder.addCase(removeProduct.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(removeProduct.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload) ? action.payload : [];
      state.totalProducts = state.products.length;
    });
    //get one Category
    builder.addCase(fetchCategoryById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCategoryById.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload) ? action.payload : [];
      state.totalProducts = state.products.length;
    });
  },
});

export default productSlice.reducer;

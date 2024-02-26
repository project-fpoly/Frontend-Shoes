import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProduct } from "../../common/redux/type";

import {
  getProducts,
  getProductById,
  getCategoryById,
  deleteProduct
} from "../../services/products";
import { isRejected } from "@reduxjs/toolkit/react";

const initialState: initialProduct = {
  loading: "idle",
  products: [],
  product: "",
  category: "",
  totalProducts: 0
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    try {
      const respone = await getProducts();
      return respone;

    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu");
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id: string) => {
    try {
      const respone = await getProductById(id);
      return respone;
    } catch (error) {
      return isRejected("Error fetching data");
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
export const removeProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, thunkApi) => {
    try {
      const response = await deleteProduct(id);
      thunkApi.dispatch(fetchAllProducts());
      return response;
    } catch (error) {
      throw new Error("Lỗi khi xóa sản phẩm");
    }
  }
);
/// đây là chỗ chọc vào kho để lấy db
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.products = Array.isArray(action.payload) ? action.payload : [];
      state.totalProducts = state.products.length;
    });
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
  },
});

export default productSlice.reducer;

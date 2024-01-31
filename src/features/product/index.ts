import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProduct } from "../../common/redux/type";
import {
  getProducts,
  getProductById,
  getCategoryById,
} from "../../services/products";
import { isRejected } from "@reduxjs/toolkit/react";

const initialState: initialProduct = {
  loading: "idle",
  products: [],
  product: {},
  category: {},
};

///// Đây là actions
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    try {
      const respone = await getProducts();
      return respone;
    } catch (error: any) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id: number) => {
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
  async (id: number) => {
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
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action: any) => {
      state.loading = "fulfilled";
      state.products = action.payload;
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action: any) => {
      state.loading = "fulfilled";
      state.product = action.payload;
    });
    builder.addCase(fetchCategoryById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action: any) => {
      state.loading = "fulfilled";
      state.category = action.payload;
    });
  },
});

export default productSlice.reducer;

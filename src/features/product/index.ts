import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialProduct } from "../../common/redux/type";
import { getProducts } from "../../services/products";
import { isRejected } from "@reduxjs/toolkit/react";

const initialState: initialProduct = {
  loading: "idle",
  products: [],
  product: {},
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
  },
});

export default productSlice.reducer;

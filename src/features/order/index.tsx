/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../services/order";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    pagination: {
      totalOrders: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllOrders.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

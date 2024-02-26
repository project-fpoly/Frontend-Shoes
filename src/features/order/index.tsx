/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IBill } from "../../common/order";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (params: {
    page?: number;
    limit?: number;
    start?: string;
    end?: string;
    search?: string;
  }) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/order/admin/bills",
        { params }
      );

      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, updateOrderData }: { id: string; updateOrderData: any }) => {
    try {
      if (typeof id === "string") {
        const response = await axios.put(
          `http://localhost:9000/api/order/bills/${id}`,
          updateOrderData
        );
        return response.data;
      } else {
        throw new Error("Invalid id"); // Xử lý trường hợp id không hợp lệ (undefined)
      }
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
export const fetchOneOrder = createAsyncThunk(
  "order/fetchOneOrder",
  async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/order/admin/bills/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/order/admin/bills/${id}`
      );

      await dispatch(fetchOrders({ page: 1, limit: 10 }));

      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

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
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOrders.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(updateOrder.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchOneOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOneOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOneOrder.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const orderToDelete = action.payload; // Đối tượng order cần xóa

        state.isLoading = false;
        state.orders = state.orders.filter(
          (order: IBill) => order._id !== orderToDelete.id
        );
      })
      .addCase(deleteOrder.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

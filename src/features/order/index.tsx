/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IBill } from "../../common/order";
import { notification } from "antd";

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
  async (
    { id, updateOrderData }: { id: string; updateOrderData: any },
    { dispatch }
  ) => {
    try {
      if (typeof id === "string") {
        const response = await axios.put(
          `http://localhost:9000/api/order/admin/bills/${id}`,
          updateOrderData
        );
        await dispatch(fetchOrders({ page: 1, limit: 10 }));
        notification.success({ message: response.data.message });

        return response.data;
      } else {
        throw new Error("Invalid id"); // Xử lý trường hợp id không hợp lệ (undefined)
      }
    } catch (error: any) {
      notification.error({ message: error.message });
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
      notification.success({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      notification.error({ message: error.message });
      throw error.response.data;
    }
  }
);
export const updateManyOrders = createAsyncThunk(
  "bills/updateMany",
  async (
    {
      ids,
      isPaid,
      isDelivered,
    }: {
      ids: string[];
      isPaid: boolean;
      isDelivered: string;
    },
    { dispatch }
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/order/admin/bills`,
        {
          ids,
          isPaid,
          isDelivered,
        }
      );
      console.log(response);
      await dispatch(fetchOrders({ page: 1, limit: 10 }));
      notification.success({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
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
    builder.addCase(updateOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder
      .addCase(updateOrder.fulfilled, (state: any, action) => {
        state.isLoading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order: IBill) => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
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
        const orderToDelete = action.payload;

        state.isLoading = false;
        state.orders = state.orders.filter(
          (order: IBill) => order._id !== orderToDelete.id
        );
      })
      .addCase(deleteOrder.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateManyOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateManyOrders.fulfilled, (state: any, action) => {
        state.isLoading = false;
        const updateManyOrders = action.payload;
        const { updates } = updateManyOrders;
        state.orders = state.orders.map((order: IBill) => {
          if (updates.ids.includes(order._id)) {
            return { ...order, ...updateManyOrders };
          }
          console.log(order);
          return order;
        });
      })
      .addCase(updateManyOrders.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

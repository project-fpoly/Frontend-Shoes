/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "order/fetchOrders",
  async (params: {
    page?: number;
    limit?: number;
    start?: string;
    end?: string;
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

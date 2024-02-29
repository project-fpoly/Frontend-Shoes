import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialNotification } from "../../common/redux/type";
import { isRejected } from "@reduxjs/toolkit/react";
import { getAllNotification } from "../../services/notification";

const initialState: initialNotification = {
  loading: "idle",
  notifications: [],
  notification: "",
};

///// Đây là actions
export const fetchAllNotification = createAsyncThunk(
  "/user/fetchAllNotification",
  async () => {
    try {
      const respone = await getAllNotification();
      return respone;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);

/// đây là chỗ chọc vào kho để lấy db
export const notificationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllNotification.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllNotification.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllNotification.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.notifications = Array.isArray(action.payload) ? action.payload : [];
    });
  },
});

export default notificationSlice.reducer;

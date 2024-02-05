import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  initialUser } from "../../common/redux/type";
import { isRejected } from "@reduxjs/toolkit/react";
import {  createUsers, getUsers } from "../../services/auth";
import { IUsers } from "../../common/users";

const initialState: initialUser = {
  loading: "idle",
  users: [],
  user: {},
};

///// Đây là actions
export const fetchAllUsers = createAsyncThunk(
  "/user/fetchAllUsers",
  async () => {
    try {
      const respone = await getUsers();
      return respone;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);
export const createNewUser = createAsyncThunk(
  "/user/createNewUser",
  async (newUser: IUsers) => { 
    try {
      const response = await createUsers(newUser); 
      return response;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);
/// đây là chỗ chọc vào kho để lấy db
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.users = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(createNewUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createNewUser.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      const newUser = action.payload as never;
      state.users.push(newUser);
    });
  },
});

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  initialUser } from "../../common/redux/type";
import { isRejected } from "@reduxjs/toolkit/react";
import {  getUsers } from "../../services/auth";

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
      console.log(respone);
      
      return respone;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);
// export const createNewUser = createAsyncThunk(
//   "/user/createNewUser",
//   async (newUser: IUsers) => { 
//     try {
//       const response = await createUsers(newUser); 
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.log("hi");
//       return isRejected("Error fetching data");
//     }
//   }
// );
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
    builder.addCase(fetchAllUsers.fulfilled, (state, action: any) => {
      state.loading = "fulfilled";
      state.users = action.payload;
    });
    // builder.addCase(createNewUser.pending, (state) => {
    //   state.loading = "pending";
    // });
    // builder.addCase(createNewUser.rejected, (state) => {
    //   state.loading = "failed";
    // });
    // builder.addCase(createNewUser.fulfilled, (state, action: any) => {
    //   state.loading = "fulfilled";
    //   state.users = action.payload;
    // });
  },
});

export default userSlice.reducer;

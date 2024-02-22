import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialUser } from "../../common/redux/type";
import { isRejected } from "@reduxjs/toolkit/react";
import { createUsers, getUsers, updateUsers } from "../../services/auth";
import { IUsers } from "../../common/users";
import { notification } from "antd";

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
      return isRejected("Error create user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "/user/updateUser",
  async ({ newUser, id }: { newUser: IUsers; id: string }, thunkApi) => {
    try {
      const response = await updateUsers(newUser, id);
      thunkApi.dispatch(fetchAllUsers());
      return response;
    } catch (error) {
      return isRejected("Error updating user");
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
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.loading = "failed";
      const error = action.error.message as string;
      notification.error({
        message: "Error",
        description: error || "Failed to create a new user.",
      });
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      const newUser = action.payload as never;
      state.users.push(newUser);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = "failed";
      const error = action.error.message as string;
      notification.error({
        message: "Error",
        description: error || "Failed to update user.",
      });
    });

    // Dispatch an action to indicate successful user update
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      const updatedUser = action.meta.arg.newUser as IUsers;

      // Find the index of the user in state.users using _id
      const index = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );

      // If the user is found, update the user in the array
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    });
  },
});

export default userSlice.reducer;

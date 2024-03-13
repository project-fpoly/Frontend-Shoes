import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialCmt } from "../../common/redux/type";
import { isRejected } from "@reduxjs/toolkit/react";
import { createComment, getComment, getCommentByProduct } from "../../services/comment";
import { ICmt } from "../../common/products";

const initialState: initialCmt = {
  loading: "idle",
  comments: [],
  comment: "",
  totalDocs: 0
};

///// Đây là actions
export const fetchAllComment = createAsyncThunk(
  "/comment/fetchAllComment",
  async ({ page, pageSize, search }: { page: number; pageSize: number; search: string }) => {
    try {
      const respone = await getComment(page, pageSize, search);
      return respone;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);
export const fetchAllCommentByProduct = createAsyncThunk(
  "/comment/fetchAllCommentByProduct",
  async (shoeId: string) => {
    try {
      const respone = await getCommentByProduct(shoeId);
      return respone;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);
export const createCommnets = createAsyncThunk(
  "/comment/createCommnets",
  async (comment: ICmt, thunkApi) => {
    try {
      const respone = await createComment(comment);
      thunkApi.dispatch(fetchAllCommentByProduct(comment.shoeId as any))
      return respone;
    } catch (error) {
      console.log("hi");
      return isRejected("Error fetching data");
    }
  }
);

/// đây là chỗ chọc vào kho để lấy db
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllComment.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllComment.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllComment.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.comments = Array.isArray(action.payload.docs) ? action.payload.docs : [];
      state.totalDocs = action.payload.totalDocs || 0;
    });
    builder.addCase(fetchAllCommentByProduct.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllCommentByProduct.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAllCommentByProduct.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.comments = Array.isArray(action.payload.docs) ? action.payload.docs : [];
      state.totalDocs = action.payload.totalDocs || 0;
    }); builder.addCase(createCommnets.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createCommnets.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(createCommnets.fulfilled, (state, action) => {
      console.log(action.payload);

      state.loading = "fulfilled";
    });

  },
});

export default commentSlice.reducer;

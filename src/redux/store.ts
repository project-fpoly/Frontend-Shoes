import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/index";
import userSlice from "../features/user/index";
import commentSlice from "../features/comment";
import categorySlice from "../features/category/index";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
    comment: commentSlice,
    category: categorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

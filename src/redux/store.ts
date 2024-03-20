import { configureStore } from '@reduxjs/toolkit'
import productSlice from '../features/product/index'
import userSlice from '../features/user/index'
import commentSlice from '../features/comment'
import categorySlice from '../features/category/index'
import orderReducer from '../features/order/index'
import notificationSlice from '../features/notification'
import cartSlice from '../features/cart'
import authSlice from '../features/auth/index'
import  voucherSlice from '../features/voucher'
import vnPaySlice from '../features/vnPay/index';

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
    comment: commentSlice,
    category: categorySlice,
    order: orderReducer,
    notification: notificationSlice,
    cart: cartSlice,
    auth: authSlice,
    voucher:voucherSlice,
    vnPay: vnPaySlice,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

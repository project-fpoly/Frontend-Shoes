import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/index'
import cartSlice from '../features/cart'
import categorySlice from '../features/category/index'
import commentSlice from '../features/comment'
import notificationSlice from '../features/notification'

import orderReducer from '../features/order/index'
import productSlice from '../features/product/index'
import userSlice from '../features/user/index'
import { analyticApi } from '../services/analytic'
import { useDispatch } from 'react-redux'

const middlewares = [analyticApi.middleware]

import voucherSlice from '../features/voucher'
import vnPaySlice from '../features/vnPay/index'
import saleSlice from '../features/sale'
import adressSlice from '../features/address/index'
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
    voucher: voucherSlice,
    vnPay: vnPaySlice,
    address: adressSlice,
    [analyticApi.reducerPath]: analyticApi.reducer,

    sale: saleSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(...middlewares),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

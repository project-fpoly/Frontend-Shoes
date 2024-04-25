/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IBill } from '../../common/order'
import { notification } from 'antd'
import { fetchAllUsers } from '../user'
import { fetchAllProducts } from '../product'
import { AppDispatch, RootState } from '../../redux/store'

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (
    params: {
      page?: number
      limit?: number
      start?: string
      end?: string
      search?: string
      key?: string
    },
    thunkApi,
  ) => {
    try {
      // Gửi yêu cầu API để lấy danh sách đơn hàng
      const response = await axios.get(
        'http://localhost:9000/api/order/admin/bills',
        {
          params,
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )

      // Dispatch các hành động khác nếu cần
      thunkApi.dispatch(fetchAllUsers({ page: 1, pageSize: 10, search: '' }))
      thunkApi.dispatch(
        fetchAllProducts({ page: 1, pageSize: 50, searchKeyword: '' }),
      )
      console.log('2')
      const currentPage = params.page // Lấy giá trị của currentPage từ params.page

      // Tạo một đối tượng mới bằng cách sao chép các thuộc tính từ response.pagination và ghi đè currentPage
      const updatedPagination = { ...response.data.pagination, currentPage }

      // Tạo một đối tượng mới cho updatedResponse bằng cách sao chép orders từ response và cập nhật pagination
      const updatedResponse = { ...response, pagination: updatedPagination }

      return updatedResponse.data
    } catch (error: any) {
      throw error.response.data
    }
  },
)

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (
    { id, updateOrderData }: { id: string; updateOrderData: any },
    thunkApi,
  ) => {
    try {
      console.log('id:', id, 'data:', updateOrderData)
      const state = thunkApi.getState() as RootState
      const { orders, pagination, params, searchApi } = state.order
      if (typeof id === 'string') {
        const res = await axios.get(
          `http://localhost:9000/api/order/admin/bills/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        if (updateOrderData.isDelivered === 'Đã giao hàng') {
          // Lấy danh sách sản phẩm từ đơn hàng
          const cartItems = res.data.cartItems

          // Lặp qua từng sản phẩm trong giỏ hàng
          for (const cartItem of cartItems) {
            const productId = cartItem.product
            const quantity = cartItem.quantity

            // Tăng sold_count của sản phẩm lên số lượng tương ứng
            for (let i = 0; i < quantity; i++) {
              await updateSoldCount(productId)
            }
          }
        }

        const response = await axios.put(
          `http://localhost:9000/api/order/admin/bills/${id}`,
          updateOrderData,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        )
        thunkApi.dispatch(
          fetchOrders({
            page: pagination.currentPage,
            limit: pagination.limit,
            search: searchApi ? searchApi : params.search || null,
            start: params.start || null,
            end: params.end || null,
          }),
        )
        notification.success({ message: response.data.message })

        return response.data
      } else {
        throw new Error('Invalid id') // Xử lý trường hợp id không hợp lệ (undefined)
      }
    } catch (error: any) {
      notification.error({ message: error.message })
      throw error.response.data
    }
  },
)
export const updateIsPaid = createAsyncThunk(
  'order/updateIsPaid',
  async (
    { id, updateOrderData }: { id?: string; updateOrderData: any },
    thunkApi,
  ) => {
    try {
      console.log('id:', id, 'data:', updateOrderData)
      const state = thunkApi.getState() as RootState
      const { orders, pagination, params, searchApi } = state.order
      const response = await axios.put(
        `http://localhost:9000/api/order/bills/paid/${id}`,
        updateOrderData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      thunkApi.dispatch(
        fetchOrders({
          page: pagination.currentPage,
          limit: pagination.limit,
          search: searchApi ? searchApi : params.search || null,
          start: params.start || null,
          end: params.end || null,
        }),
      )

      return response.data
    } catch (error: any) {
      notification.error({ message: error.message })
      throw error.response.data
    }
  },
)
const updateSoldCount = async (productId: string) => {
  try {
    await axios.patch(
      `http://localhost:9000/api/product/${productId}/sold_count`,
      {},
    )
  } catch (error) {
    console.error('Error updating sold_count:', error)
  }
}
export const fetchOneOrder = createAsyncThunk(
  'order/fetchOneOrder',
  async (params: { search?: string }, { dispatch }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/order/bills/guest?search=${params}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      dispatch(fetchAllProducts({ page: 1, pageSize: 50, searchKeyword: '' }))

      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
)
export const SearchOrder = createAsyncThunk(
  'order/SearchOrder',
  async (params: { search?: string }, { dispatch }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/order/admin/bills/search?search=${params}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      dispatch(fetchAllProducts({ page: 1, pageSize: 50, searchKeyword: '' }))

      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
)
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id: string, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState
      const { pagination } = state.order
      const response = await axios.delete(
        `http://localhost:9000/api/order/admin/bills/${id}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )

      thunkApi.dispatch(
        fetchOrders({ page: pagination.currentPage, limit: pagination.limit }),
      )
      notification.success({ message: response.data.message })
      return response.data
    } catch (error: any) {
      notification.error({ message: error.message })
      throw error.response.data
    }
  },
)
export const updateManyOrders = createAsyncThunk(
  'bills/updateMany',
  async (
    {
      ids,
      isPaid,
      isDelivered,
    }: {
      ids: string[]
      isPaid: boolean
      isDelivered: string
    },
    thunkApi,
  ) => {
    try {
      const state = thunkApi.getState() as RootState
      const { pagination, params } = state.order
      const response = await axios.put(
        `http://localhost:9000/api/order/admin/bills`,
        {
          ids,
          isPaid,
          isDelivered,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      thunkApi.dispatch(
        fetchOrders({
          page: pagination.currentPage,
          limit: pagination.limit,
          search: params.search || null,
          start: params.start || null,
          end: params.end || null,
        }),
      )
      notification.success({ message: response.data.message })
      return response.data
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
)
export const updateIsDeliveredOrder = createAsyncThunk(
  'order/updateIsDeliveredOrder',
  async (
    {
      id,
      isDelivered,
    }: {
      id: string
      isDelivered: string
    },
    thunkApi,
  ) => {
    try {
      if (typeof id === 'string') {
        const response = await axios.put(
          `http://localhost:9000/api/order/bills/${id}`,
          { isDelivered },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        )
        notification.success({ message: 'Đã hủy đơn hàng' })

        thunkApi.dispatch(getOrderByUsers({ page: 1, limit: 10 }))

        return response.data
      } else {
        throw new Error('Invalid id') // Xử lý trường hợp id không hợp lệ (undefined)
      }
    } catch (error: any) {
      notification.error({ message: error.message })
      throw error.response.data
    }
  },
)
// get order by user
export const getOrderByUsers = createAsyncThunk(
  'ordersUser/getOrderByUsers',
  async (
    params: {
      page?: number
      limit?: number
      start?: any
      end?: any
      search?: any
    },
    thunkApi,
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/order/bills`,
        {
          params,
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      thunkApi.dispatch(fetchAllUsers({ page: 1, pageSize: 10, search: '' }))
      thunkApi.dispatch(
        fetchAllProducts({ page: 1, pageSize: 50, searchKeyword: '' }),
      )
      const currentPage = params.page // Lấy giá trị của currentPage từ params.page

      // Tạo một đối tượng mới bằng cách sao chép các thuộc tính từ response.pagination và ghi đè currentPage
      const updatedPagination = { ...response.data.pagination, currentPage }

      // Tạo một đối tượng mới cho updatedResponse bằng cách sao chép orders từ response và cập nhật pagination
      const updatedResponse = { ...response, pagination: updatedPagination }

      return updatedResponse.data
    } catch (error: any) {
      throw error.response.data
    }
  },
)
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    ordersUser: [],
    pagination: {
      totalOrders: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
    },
    params: {
      end: '',
      limit: 10,
      page: 1,
      search: '',
      start: '',
      key: '',
    },
    searchApi: '',
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.orders
        state.pagination = action.payload.pagination
        state.params = action.meta.arg
      })
      .addCase(fetchOrders.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateOrder.fulfilled, (state: any, action) => {
        state.isLoading = false
        const updatedOrder = action.payload.updatedCart
        const index = state.orders.findIndex(
          (order: IBill) => order._id === updatedOrder._id,
        )
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
      })
      .addCase(updateOrder.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(updateIsPaid.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateIsPaid.fulfilled, (state: any, action) => {
        state.isLoading = false
        const updateIsPaid = action.payload.updatedCart
        const index = state.orders.findIndex(
          (order: IBill) => order._id === updateIsPaid._id,
        )
        if (index !== -1) {
          state.orders[index] = updateIsPaid
        }
      })
      .addCase(updateIsPaid.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(fetchOneOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOneOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOneOrder.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(SearchOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(SearchOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
        state.searchApi = action.meta.arg
      })
      .addCase(SearchOrder.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const orderToDelete = action.payload

        state.isLoading = false
        state.orders = state.orders.filter(
          (order: IBill) => order._id !== orderToDelete.id,
        )
      })
      .addCase(deleteOrder.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(updateManyOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateManyOrders.fulfilled, (state: any, action) => {
        state.isLoading = false
        const updateManyOrders = action.payload
        const { updates } = updateManyOrders
        state.orders = state.orders.map((order: IBill) => {
          if (updates.ids.includes(order._id)) {
            return { ...order, ...updateManyOrders }
          }
          return order
        })
      })
      .addCase(updateManyOrders.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    builder
      .addCase(updateIsDeliveredOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateIsDeliveredOrder.fulfilled, (state: any, action) => {
        state.isLoading = false
        const updateIsDeliveredOrder = action.payload
        const index = state.orders.findIndex(
          (order: IBill) => order._id === updateIsDeliveredOrder._id,
        )
        if (index !== -1) {
          state.orders[index] = updateIsDeliveredOrder
        }
      })
      .addCase(updateIsDeliveredOrder.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})
const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState: {
    orders: [],
    ordersUser: [],
    pagination: {
      totalOrders: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
    },
    params: {
      end: '',
      limit: 10,
      page: 1,
      search: null,
      start: '',
    },
    searchApi: '',
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getOrderByUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.ordersUser = action.payload.ordersUser
        state.pagination = action.payload.pagination
        state.params = action.meta.arg
      })
      .addCase(getOrderByUsers.rejected, (state: any, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})
export const orderReducer = orderSlice.reducer
export const ordersUserReducer = ordersUserSlice.reducer

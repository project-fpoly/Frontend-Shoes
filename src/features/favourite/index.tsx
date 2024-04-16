// redux/slices/favSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'
import { notification } from 'antd'
import { fetchAllProducts } from '../product'

import axios from 'axios'
interface FavState {
  loading: boolean
  error: string | null
  favItems: any[] // Define type based on your API response
}

const initialState: FavState = {
  loading: false,
  error: null,
  favItems: [],
}

export const addFavItems = createAsyncThunk(
  'fav/addFavItems',
  async (favItems: any, thunkApi) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      let response

      if (accessToken) {
        // Người dùng đã đăng nhập
        response = await axios.post(
          'http://localhost:9000/api/fav/favourite',
          {
            product: favItems.product,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        )
        notification.success({ message: response.data.message })
        thunkApi.dispatch(getFavItems())
        return response.data.cart
      } else {
        response = await axios.post(
          'http://localhost:9000/api/fav/favourite',
          {
            product: favItems.product,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        )
        return sessionStorage.setItem(
          'cart',
          JSON.stringify(response.data.cart),
        )
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
)
export const getFavItems = createAsyncThunk(
  'fav/getFavItems',
  async (e, thunkApi) => {
    try {
      const response = await axios.get(
        'http://localhost:9000/api/fav/favourite',

        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      //   thunkApi.dispatch(
      //     fetchAllProducts({ page: 1, pageSize: 10, searchKeyword: '' }),
      //   )

      return response.data
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
)
export const removeFromFav = createAsyncThunk(
  'fav/removeFromFav',
  async (product: string, thunkApi) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/fav/favourite/${product}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      )
      notification.success({ message: response.data.message })
      thunkApi.dispatch(getFavItems())

      return response.data
    } catch (error: any) {
      notification.error({ message: error.message })

      throw new Error(error.response.data.message)
    }
  },
)
export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addFavItems.fulfilled, (state, action) => {
        state.loading = false
        console.log(action)
        console.log(state)
        state.favItems.push(action.meta.arg) // Update state with API response
      })
      .addCase(addFavItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to add fav items'
      })
    builder
      .addCase(getFavItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getFavItems.fulfilled, (state: any, action) => {
        state.loading = false
        state.favItems = action.payload
      })
      .addCase(getFavItems.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.payload
      })
    builder
      .addCase(removeFromFav.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromFav.fulfilled, (state, action) => {
        state.favItems = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(removeFromFav.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default favSlice.reducer

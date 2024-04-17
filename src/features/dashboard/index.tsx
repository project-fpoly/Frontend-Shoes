import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialChart } from '../../common/redux/type'
import { isRejected } from '@reduxjs/toolkit/react'
import { getChart, getLists } from '../../services/dashboard'

const initialState: initialChart = {
  loading: 'idle',
  list: [],
  data: [],
}

export const fetchList = createAsyncThunk(
  '/user/fetchList',
  async () => {
    try {
      const respone = await getLists()
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  }
)
export const fetchData = createAsyncThunk(
    '/user/fetchData',
    async (id:string) => {
      try {
        const respone = await getChart(id)
        return respone
      } catch (error) {
        console.log('error')
        return isRejected('Error fetching data')
      }
    }
  )
/// đây là chỗ chọc vào kho để lấy db
export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchList.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchList.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.list = Array.isArray(action.payload.data)
        ? action.payload.data
        : []
    })
    builder.addCase(fetchData.pending, (state) => {
        state.loading = 'pending'
      })
      builder.addCase(fetchData.rejected, (state) => {
        state.loading = 'failed'
      })
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.data = Array.isArray(action.payload.data)
          ? action.payload.data
          : []
      })
  },
})

export default chartSlice.reducer

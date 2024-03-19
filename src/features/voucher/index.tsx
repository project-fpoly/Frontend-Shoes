import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialUser, initialVoucher } from '../../common/redux/type'
import { isRejected } from '@reduxjs/toolkit/react'
import { getVoucher } from '../../services/voucher'

const initialState: initialVoucher = {
  loading: 'idle',
  vouchers: [],
  voucher: '',
}

export const fetchVoucher = createAsyncThunk(
  '/user/fetchVoucher',
  async () => {
    try {
      const respone = await getVoucher()
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  }
)
/// đây là chỗ chọc vào kho để lấy db
export const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVoucher.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchVoucher.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchVoucher.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.vouchers = Array.isArray(action.payload.data)
        ? action.payload.data
        : []
    })
  },
})

export default voucherSlice.reducer

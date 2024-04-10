import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialUser, initialVoucher } from '../../common/redux/type'
import { isRejected } from '@reduxjs/toolkit/react'
import {
  creVoucher,
  deleVoucher,
  getVoucher,
  putVoucher,
  getOneVoucher,
} from '../../services/voucher'
import { IVoucher } from '../../common/voucher'

const initialState: initialVoucher = {
  loading: 'idle',
  vouchers: [],
  voucher: '',
}

export const fetchVoucher = createAsyncThunk('/user/fetchVoucher', async () => {
  try {
    const respone = await getVoucher()
    return respone
  } catch (error) {
    console.log('error')
    return isRejected('Error fetching data')
  }
})
export const fetchOneVoucher = createAsyncThunk(
  '/user/fetchOneVoucher',
  async (code: any) => {
    console.log(typeof code)
    try {
      const respone = await getOneVoucher(code)
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  },
)
export const createVoucher = createAsyncThunk(
  '/user/createVoucher',
  async (data: IVoucher, thunkApi) => {
    try {
      const respone = await creVoucher(data)
      thunkApi.dispatch(fetchVoucher())
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  },
)
export const updateVoucher = createAsyncThunk(
  '/user/updateVoucher',
  async (data: IVoucher, thunkApi) => {
    try {
      const respone = await putVoucher(data)
      thunkApi.dispatch(fetchVoucher())
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  },
)
export const deleteeVoucher = createAsyncThunk(
  '/user/deleteVoucher',
  async (data: string, thunkApi) => {
    try {
      const respone = await deleVoucher(data)
      thunkApi.dispatch(fetchVoucher())
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  },
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
    builder.addCase(createVoucher.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(createVoucher.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(createVoucher.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
    builder.addCase(updateVoucher.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(updateVoucher.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(updateVoucher.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
    builder.addCase(deleteeVoucher.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(deleteeVoucher.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(deleteeVoucher.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
    builder.addCase(fetchOneVoucher.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchOneVoucher.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.voucher = action.payload
    })
    builder.addCase(fetchOneVoucher.rejected, (state) => {
      state.loading = 'failed'
    })
  },
})

export default voucherSlice.reducer

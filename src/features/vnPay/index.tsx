import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createPaymentUrl = createAsyncThunk(
  'vnPay/createPaymentUrl',
  async ({
    amount,
    bankCode,
    language,
    orderId,
  }: {
    amount: number
    bankCode: string
    language: string
    orderId: string
  }) => {
    try {
      const res = await axios.post(
        'http://localhost:9000/order/create_payment_url',
        { amount, bankCode, language, orderId },
      )
      console.log(res)
      return res.data.data
    } catch (error) {
      throw error
    }
  },
)
const vnPaySlice = createSlice({
  name: 'vnPay',
  initialState: {
    status: 'idle',
    error: null,
    paymentUrl: '',
    redirectUrl: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentUrl.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPaymentUrl.fulfilled, (state, action) => {
        state.loading = false
        state.redirectUrl = action.payload
      })
      .addCase(createPaymentUrl.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default vnPaySlice.reducer

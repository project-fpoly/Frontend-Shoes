import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState: any = {
  loading: false,
  error: null as string | null,
}
export const getProvinces = createAsyncThunk(
  'adress/getProvinces',
  async (q: string) => {
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        {
          headers: {
            token: 'ada81f7b-f088-11ee-8d6a-5276b526e4bb',
          },
        },
      )
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  },
)
export const getDistricts = createAsyncThunk(
  'adress/getDistricts',
  async (provinceID: any) => {
    try {
      const response = await axios.get(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
        {
          params: { province_id: provinceID },
          headers: {
            token: 'ada81f7b-f088-11ee-8d6a-5276b526e4bb',
          },
        },
      )
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  },
)
export const getWards = createAsyncThunk(
  'adress/getWards',
  async (districtId: any) => {
    try {
      const response = await axios.get(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
        {
          params: { district_id: districtId },
          headers: {
            token: 'ada81f7b-f088-11ee-8d6a-5276b526e4bb',
          },
        },
      )
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  },
)
export const getShippingOrders = createAsyncThunk(
  'address/getShippingOrders',
  async ({
    service_type_id,
    from_district_id,
    to_district_id,
    to_ward_code,
    height,
    length,
    weight,
    width,
    insurance_value,
    coupon,
    items,
  }: {
    service_type_id: number
    from_district_id: any
    to_district_id: any
    to_ward_code: any
    height: number
    length: number
    weight: number
    width: number
    insurance_value: number
    coupon: any
    items: {
      name: string
      quantity: number
      height: number
      weight: number
      length: number
      width: number
    }[]
  }) => {
    try {
      const response = await axios.get(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
        {
          params: {
            service_type_id: service_type_id,
            from_district_id: from_district_id,
            to_district_id: to_district_id,
            to_ward_code: to_ward_code,
            height: height,
            length: length,
            weight: weight,
            width: width,
            insurance_value: insurance_value,
            coupon: coupon,
            items: items,
          },
          headers: {
            token: 'ada81f7b-f088-11ee-8d6a-5276b526e4bb',
            ShopId: 4990084,
          },
        },
      )
      return response.data.data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  },
)
const adressSlice = createSlice({
  name: 'adress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinces.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loading = false
        state.province = action.payload
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
    builder
      .addCase(getDistricts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.loading = false
        state.district = action.payload
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
    builder
      .addCase(getWards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getWards.fulfilled, (state, action) => {
        state.loading = false
        state.ward = action.payload
      })
      .addCase(getWards.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
    builder
      .addCase(getShippingOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getShippingOrders.fulfilled, (state, action) => {
        state.loading = false
        state.shipping = action.payload
      })
      .addCase(getShippingOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
  },
})
export default adressSlice.reducer
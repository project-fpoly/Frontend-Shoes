import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialSale } from '../../common/redux/type';
import { ISale } from '../../common/sale';
import { addSale, deleteSale, getSales, updateSale } from '../../services/sale';

const initialState: initialSale = {
  loading: 'idle',
  sales: [],
  sale: '',
};

export const fetchAllSales = createAsyncThunk(
  'sale/fetchAllSales',
  async ({ page, limit, keyword }: { page: number; limit: number; keyword: string }) => {
    try {
      const response = await getSales(page, limit, keyword);
      return response;
    } catch (error) {
      throw new Error('Lỗi khi lấy dữ liệu');
    }
  }
);

export const removeSale = createAsyncThunk(
  'sale/deleteSale',
  async (id: string, thunkApi) => {
    try {
      const response = await deleteSale(id);
      thunkApi.dispatch(fetchAllSales({ page: 1, limit: 10, keyword: '' }));
      return response;
    } catch (error) {
      throw new Error('Lỗi khi xóa');
    }
  }
);

export const createSale = createAsyncThunk(
  'sale/createSale',
  async (newSale: ISale, thunkApi) => {
    try {
      const response = await addSale(newSale);
      thunkApi.dispatch(fetchAllSales({ page: 1, limit: 10, keyword: '' }));
      return response;
    } catch (error) {
      throw new Error('Lỗi khi tạo bán hàng');
    }
  }
);

export const updateSales = createAsyncThunk(
  'sale/updateSale',
  async ({ id, newSale }: { id: string; newSale: ISale }, thunkApi) => {
    try {
      const response = await updateSale(id, newSale);
      thunkApi.dispatch(fetchAllSales({ page: 1, limit: 10, keyword: '' }));
      return response;
    } catch (error) {
      throw new Error('Lỗi khi cập nhật bán hàng');
    }
  }
);

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllSales.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAllSales.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(fetchAllSales.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.sales = Array.isArray(action.payload.data) ? action.payload.data : [];
      });
  },
});

export default saleSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialCategory } from '../../common/redux/type'
import {
  getCategories,
  deleteCate,
  addCategory,
  updateCate,
} from '../../services/category'
import { ICategory } from '../../common/category'
import { notification } from 'antd'

const initialState: initialCategory = {
  loading: 'idle',
  categories: [],
  category: '',
  totalDocs: 0,
}

export const fetchAllCategories = createAsyncThunk(
  'category/fetchAllCategories',
  async ({
    page,
    limit,
    keyword,
  }: {
    page: number
    limit: number
    keyword: string
  }) => {
    try {
      const response = await getCategories(page, limit, keyword)
      return response
    } catch (error) {
      throw new Error('Lỗi khi lấy dữ liệu')
    }
  },
)
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: string, thunkApi) => {
    try {
      const response = await deleteCate(id)
      thunkApi.dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: '' }))
      return response
    } catch (error) {
      throw new Error('Lỗi khi xóa danh mục')
    }
  },
)
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (newCategory: ICategory, thunkApi) => {
    try {
      const response = await addCategory(newCategory)
      thunkApi.dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: '' }))
      return response
    } catch (error) {
      throw new Error('Error create category')
    }
  },
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (
    { id, newCategory }: { id: string; newCategory: ICategory },
    thunkApi,
  ) => {
    try {
      const response = await updateCate(id, newCategory)
      thunkApi.dispatch(fetchAllCategories({ page: 1, limit: 10, keyword: '' }))
      return response
    } catch (error) {
      throw new Error('Error updating category')
    }
  },
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.categories = Array.isArray(action.payload.data)
        ? action.payload.data
        : []
      state.totalDocs = action.payload.totalDocs
    })
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(deleteCategory.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.categories = Array.isArray(action.payload) ? action.payload : []
      state.totalDocs = state.categories.length
    })
    builder.addCase(createCategory.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = 'failed'
      const error = action.error.message as string
      notification.error({
        message: 'Error',
        description: error || 'Failed to create a new user.',
      })
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      const newCategory = action.payload as never
      state.categories.push(newCategory)
    })
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = 'failed'
      const error = action.error.message as string
      notification.error({
        message: 'Error',
        description: error || 'Failed to update user.',
      })
    })
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
  },
})

export default categorySlice.reducer

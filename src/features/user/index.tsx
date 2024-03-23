import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialUser } from '../../common/redux/type'
import { isRejected } from '@reduxjs/toolkit/react'
import {
  createUsers,
  deleteUsers,
  getOneUsers,
  getUsers,
  updateUsers,
} from '../../services/auth'
import { IUsers } from '../../common/users'
import { notification } from 'antd'
import { fetchAllNotification } from '../notification'

const initialState: initialUser = {
  loading: 'idle',
  users: [],
  user: '',
  totalDocs: 0,
}

///// Đây là actions
export const fetchAllUsers = createAsyncThunk(
  '/user/fetchAllUsers',
  async ({
    page,
    pageSize,
    search,
  }: {
    page: number
    pageSize: number
    search: string
  }) => {
    try {
      const respone = await getUsers(page, pageSize, search)
      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  },
)
export const fetchOneUsers = createAsyncThunk(
  '/user/fetchOneUsers',
  async () => {
    try {
      const respone = await getOneUsers()
      console.log(respone)

      return respone
    } catch (error) {
      console.log('error')
      return isRejected('Error fetching data')
    }
  },
)
export const createNewUser = createAsyncThunk(
  '/user/createNewUser',
  async (newUser: IUsers) => {
    try {
      const response = await createUsers(newUser)
      return response
    } catch (error) {
      return isRejected('Error create user')
    }
  },
)

export const updateUser = createAsyncThunk(
  '/user/updateUser',
  async ({ newUser, id }: { newUser: IUsers; id: string }, thunkApi) => {
    try {
      const response = await updateUsers(newUser, id)
      thunkApi.dispatch(fetchAllUsers({ page: 1, pageSize: 10, search: '' }))
      return response
    } catch (error) {
      return isRejected('Error updating user')
    }
  },
)
export const deleteeUser = createAsyncThunk(
  '/user/deleteUser',
  async (id: string[], thunkApi) => {
    try {
      const response = await deleteUsers(id)
      thunkApi.dispatch(fetchAllUsers({ page: 1, pageSize: 10, search: '' }))
      thunkApi.dispatch(fetchAllNotification())
      return response
    } catch (error) {
      return isRejected('Error updating user')
    }
  },
)
/// đây là chỗ chọc vào kho để lấy db
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.users = Array.isArray(action.payload.docs)
        ? action.payload.docs
        : []
      state.totalDocs = action.payload.totalDocs || 0
    })
    builder.addCase(fetchOneUsers.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchOneUsers.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchOneUsers.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.user = action.payload.user
    })
    builder.addCase(createNewUser.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.loading = 'failed'
      const error = action.error.message as string
      notification.error({
        message: 'Error',
        description: error || 'Failed to create a new user.',
      })
    })
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      const newUser = action.payload as never
      state.users.push(newUser)
    })
    builder.addCase(updateUser.pending, (state) => {
      state.loading = 'pending'
    })

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = 'failed'
      const error = action.error.message as string
      notification.error({
        message: 'Error',
        description: error || 'Failed to update user.',
      })
    })

    // Dispatch an action to indicate successful user update
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
    builder.addCase(deleteeUser.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(deleteeUser.rejected, (state, action) => {
      state.loading = 'failed'
      const error = action.error.message as string
      notification.error({
        message: 'Error',
        description: error || 'Failed to delete user.',
      })
    })
    builder.addCase(deleteeUser.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.users = Array.isArray(action.payload) ? action.payload : []
    })
  },
})

export default userSlice.reducer

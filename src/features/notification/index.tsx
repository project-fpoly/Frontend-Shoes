import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialNotification } from '../../common/redux/type'
import { isRejected } from '@reduxjs/toolkit/react'
import {
  createNotification,
  getAllNotification,
  getOneNotification,
  getSentNotification,
  updateNotification,
} from '../../services/notification'
import { ISendNoti } from '../../common/notification'

const initialState: initialNotification = {
  loading: 'idle',
  notifications: [],
  notification: '',
  listSend: [],
}

///// Đây là actions
export const fetchAllNotification = createAsyncThunk(
  '/user/fetchAllNotification',
  async (type: string) => {
    try {
      const respone = await getAllNotification(type)
      return respone
    } catch (error) {
      console.log('hi')
      return isRejected('Error fetching data')
    }
  },
)
export const fetchNotificationById = createAsyncThunk(
  'notification/fetchNotificationById',
  async (id: string) => {
    try {
      // Gọi API để lấy thông báo theo `id`
      const response = await getOneNotification(id)
      return response
    } catch (error) {
      return isRejected('Error fetching data')
    }
  },
)
export const updateNotificationById = createAsyncThunk(
  'notification/updateNotificationById',
  async (id: string) => {
    try {
      // Gọi API để lấy thông báo theo `id`
      updateNotification(id)
      return
    } catch (error) {
      return isRejected('Error fetching data')
    }
  },
)
export const sendNotification = createAsyncThunk(
  'notification/sendNotification',
  async (data: ISendNoti, thunkApi) => {
    try {
      const responsive = await createNotification(data)
      thunkApi.dispatch(fetchAllNotification(''))
      thunkApi.dispatch(getSendNotifications())
      return responsive
    } catch (error) {
      return isRejected('Error send notification ')
    }
  },
)
export const getSendNotifications = createAsyncThunk(
  'notification/getSendNotifications',
  async () => {
    try {
      const responsive = await getSentNotification()
      return responsive
    } catch (error) {
      return isRejected('Error fetching data')
    }
  },
)
/// đây là chỗ chọc vào kho để lấy db
export const notificationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllNotification.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchAllNotification.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchAllNotification.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.notifications = Array.isArray(action.payload) ? action.payload : []
    })
    builder.addCase(fetchNotificationById.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchNotificationById.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchNotificationById.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.notification = action.payload
    })
    builder.addCase(updateNotificationById.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(updateNotificationById.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(updateNotificationById.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
    builder.addCase(sendNotification.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(sendNotification.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(sendNotification.fulfilled, (state) => {
      state.loading = 'fulfilled'
    })
    builder.addCase(getSendNotifications.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getSendNotifications.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(getSendNotifications.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
      state.listSend = action.payload
    })
  },
})

export default notificationSlice.reducer

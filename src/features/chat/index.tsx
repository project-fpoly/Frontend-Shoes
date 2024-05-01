import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  LoginRequest,
  getUserByEmailChat,
  loginUserChat,
} from '../../services/chat'
import { initialChat } from '../../common/redux/type'
import { useDispatch } from 'react-redux' // Import useDispatch

// Khởi tạo trạng thái ban đầu cho slice của chat
const initialState: initialChat = {
  loading: 'idle',
  userChat: {
    username: '',
    secret: '',
    create_by: {
      _id: '',
      userName: '',
      email: '',
    },
  },
}

// Tạo action async thunk để gọi API và lấy thông tin userChat bằng email
export const fetchUserChatByEmail = createAsyncThunk(
  'chat/fetchUserChatByEmail',
  async (email: string) => {
    try {
      const response = await getUserByEmailChat(email)
      return response
    } catch (error) {
      throw new Error('Lỗi khi lấy dữ liệu')
    }
  },
)

export const LoginUserChatFeature = createAsyncThunk(
  'chat/loginUserChatFeature',
  async ({ username, secret }: LoginRequest) => {
    try {
      const response = await loginUserChat(username, secret)
      return response
    } catch (error) {
      throw new Error('Lỗi khi lấy dữ liệu')
    }
  },
)
// Tạo slice cho trạng thái chat
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  // Xử lý các action được sinh ra bởi createAsyncThunk
  extraReducers(builder) {
    // Xử lý action fetchUserChatByEmail.pending khi đang loading
    builder.addCase(fetchUserChatByEmail.pending, (state) => {
      state.loading = 'pending' // Đặt trạng thái loading là 'pending'
    })
    // Xử lý action fetchUserChatByEmail.fulfilled khi thành công
    builder.addCase(fetchUserChatByEmail.fulfilled, (state, action) => {
      state.loading = 'fulfilled' // Đặt trạng thái loading là 'fulfilled'
      state.userChat = action.payload // Lưu thông tin userChat từ payload
    })
    // Xử lý action fetchUserChatByEmail.rejected khi thất bại
    builder.addCase(fetchUserChatByEmail.rejected, (state) => {
      state.loading = 'failed' // Đặt trạng thái loading là 'failed'
    })
    builder.addCase(LoginUserChatFeature.pending, (state) => {
      state.loading = 'pending' // Đặt trạng thái loading là 'pending'
    })
    // Xử lý action loginUserChatFeature.fulfilled khi thành công
    builder.addCase(LoginUserChatFeature.fulfilled, (state) => {
      state.loading = 'fulfilled' // Đặt trạng thái loading là 'fulfilled'
      // Xử lý dữ liệu trả về từ action thành công ở đây nếu cần
    })
    // Xử lý action loginUserChatFeature.rejected khi thất bại
    builder.addCase(LoginUserChatFeature.rejected, (state) => {
      state.loading = 'failed' // Đặt trạng thái loading là 'failed'
      // Xử lý lỗi từ action bị reject ở đây nếu cần
    })
  },
})

export default chatSlice.reducer

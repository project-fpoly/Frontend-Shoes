import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../../redux/store.ts'
import axios from 'axios'
import { notification } from 'antd'

interface AuthState {
  user: any | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions

export const getUserByID = () => async (dispatch: AppDispatch) => {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
    const response = await axios.get(
      `http://localhost:9000/api/auth/user`,
      config,
    )
    dispatch(setUser(response.data.user))
  } catch (err: any) {
    throw new Error(err)
  }
}

export default authSlice.reducer

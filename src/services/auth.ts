import { AxiosResponse } from 'axios'
import { notification } from 'antd'
import instance from '../core/Api'
import { CustomError } from '../common/error'
import { IUsers } from '../common/users'
import IUser from './../types/user'
import io from 'socket.io-client'

export const Signup = async (data: IUser) => {
  try {
    const response = await instance.post('/auth/signup', data);
    return response.data;
  } catch (error: any) {
    notification.error({
      message: 'Đăng ký thất bại',
      description: error.message || 'Có lỗi xảy ra khi đăng ký',
    });
    throw error;
  }
};

export const Signin = async (data: IUser) => {
  try {
    const response = await instance.post('/auth/signin', data);
    notification.success({
      message: 'Đăng nhập thành công',
      description: 'Bạn đã đăng nhập thành công.',
    });
    return response.data;
  } catch (error: any) {
    notification.error({
      message: 'Đăng nhập thất bại',
      description: error.message || 'Có lỗi xảy ra khi đăng nhập',
    });
    throw error;
  }
};
export const ForgotPass = (data: IUser) => {
  return instance.post('/auth/forgotpassword', data)
}

export const getUsers = async (page = 1, pageSize = 10, search = '', isDelete = false) => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/auth/users?page=${page}&pageSize=${pageSize}&search=${search}&isDelete=${isDelete}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export const getOneUsers = async () => {
  try {
    const response: AxiosResponse = await instance.get(`/api/auth/user`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return
  }
}

export const createUsers = async (newUser: IUsers) => {
  try {
    const response: AxiosResponse<{ newUser: IUsers[]; message: string }> =
      await instance.post('/api/auth/create', newUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
    console.log(response)
    notification.success({ message: response.data.message })
    return response.data.newUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateUsers = async (newUser: IUsers, id: string) => {
  try {
    const response: AxiosResponse<{ message: string; newUser: IUsers[] }> =
      await instance.put(`/api/auth/users/${id}`, newUser, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
    notification.success({ message: response.data.message })
    return response.data.newUser
  } catch (error) {
    const customError = error as CustomError
    const errorMessage = customError.response?.data?.message || 'Update failed'
    notification.error({ message: errorMessage })
    throw error
  }
}

export const deleteUsers = async (userIds: string[]) => {
  try {
    const response: AxiosResponse = await instance.delete(
      '/api/auth/more-users',
      {
        data: { userIds },
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    notification.success(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const delete2Users = async (userIds: string) => {
  try {
    const response: AxiosResponse = await instance.delete(
      (`/api/auth/user/${userIds}`),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    notification.success(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

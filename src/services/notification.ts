import { AxiosResponse } from 'axios'
import instance from '../core/Api'
import { ISendNoti } from '../common/notification'
import { notification } from 'antd'

export const getAllNotification = async (type: string) => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/notification/role?type=${type}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export const getOneNotification = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/notification/one/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createNotification = async (data: ISendNoti) => {
  try {
    const response = await instance.post('/api/notification/create', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },)
    console.log(response)
    notification.success({ message: 'Gửi thành công' })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getSentNotification = async () => {
  try {
    const response = await instance.get('/api/notification/all/sendMember', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateNotification = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.put(
      `/api/notification/update/${id}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// export const deleteUsers = async (userIds: string[]) => {
//   try {
//     const response: AxiosResponse = await instance.delete(
//       "/api/auth/more-users",
//       {
//         data: { userIds },
//       }
//     );
//     notification.success(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

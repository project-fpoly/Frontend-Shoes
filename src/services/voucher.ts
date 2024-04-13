import { AxiosResponse } from 'axios'
import instance from '../core/Api'
import { IVoucher } from '../common/voucher'
import { notification } from 'antd'

export const getVoucher = async () => {
  try {
    const response: AxiosResponse = await instance.get(`/api/voucher`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export const getOneVoucher = async (code: string) => {
  try {
    const response = await instance.get(`/api/voucher/one/${code}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const creVoucher = async (data: IVoucher) => {
  try {
    const response: AxiosResponse = await instance.post(`/api/voucher`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    notification.success({ message: 'Tạo thành công' })
    return response.data
  } catch (error) {
    notification.error({ message: 'Tạo thất bại' })
    console.error(error)
  }
}
export const putVoucher = async (data: IVoucher) => {
  try {
    const { _id, create_by, ...setdata } = data
    const response: AxiosResponse = await instance.put(
      `/api/voucher/${data._id}`,
      setdata,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    notification.success({ message: 'Cập nhật thành công' })
    return response.data
  } catch (error) {
    notification.error({ message: 'Cập nhật thất bại.' })
    console.error(error)
  }
}
export const deleVoucher = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.delete(
      `/api/voucher/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    notification.success({ message: 'Xóa thành công' })
    return response.data
  } catch (error) {
    notification.error({ message: 'Xóa thất bại' })
    console.error(error)
  }
}

import { AxiosResponse } from 'axios'
import instance from '../core/Api'

export const getVoucher = async () => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/voucher`,
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


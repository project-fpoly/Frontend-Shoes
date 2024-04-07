import { ICmt } from './../common/products'
import { AxiosResponse } from 'axios'
import instance from '../core/Api'
export const getComment = async (page = 1, pageSize = 10, search = '') => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/comments/all?page=${page}&pageSize=${pageSize}&search=${search}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export const getCommentByProduct = async (shoeId: string) => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/comments/all?shoeId=${shoeId}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createComment = async (commnets: ICmt) => {
  try {
    const response: AxiosResponse = await instance.post(
      `/api/comments/create`,
      commnets,
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
export const deleteComment = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.delete(
      `/api/comments/delete/${id}`,
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


export const updateComment = async (commnets: ICmt) => {
  try {
    const response: AxiosResponse = await instance.patch(
      `/api/comments/patch`,
      commnets,
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
import instance from '../core/Api'
import { AxiosResponse } from 'axios'
import { ICategory } from '../common/category'
import { notification } from 'antd'
import { CustomError } from '../common/error'
interface ServerResponse {
  data: ICategory | null;
  message: string;
}
export const getCategories = async (page = 1, limit = 10, keyword = '') => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/categories?page=${page}&limit=${limit}&keyword=${keyword}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    )
    return response.data || response
  } catch (error) {
    console.log(error)
    throw new Error('Error while fetching categories.')
  }
}

export const getCategoryById = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.get(`/api/categories/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    )
    return response.data || response
  } catch (error) {
    console.log(error)
    throw new Error('Error while fetching category by ID.')
  }
}

export const addCategory = async (
  category: ICategory
): Promise<ICategory | null> => {
  try {
    const response: AxiosResponse<ServerResponse> = await instance.post(
      '/api/categories',
      category,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    notification.success({ message: 'Category added successfully' });
    return response.data?.data || null;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || 'Error while adding category.';
    notification.error({ message: errorMessage });
    throw new Error('Error while adding category.');
  }
};

export const updateCate = async (
  id: string,
  category: ICategory
): Promise<ICategory | null> => {
  try {
    const response: AxiosResponse<ServerResponse> = await instance.put(
      `/api/categories/${id}`,
      category,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    notification.success({ message: 'Category updated successfully' });
    return response.data?.data || null; 
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || 'Error while updating category.';
    notification.error({ message: errorMessage });
    throw new Error('Error while updating category.');
  }
};


export const deleteCate = async (id: string): Promise<ICategory | null> => {
  try {
    const response: AxiosResponse<ICategory> = await instance.delete(
      `/api/categories/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    )
    notification.success({ message: 'Category deleted successfully.' })
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Error while deleting category.'
    notification.error({ message: errorMessage })
    throw new Error('Error while deleting category.')
  }
}

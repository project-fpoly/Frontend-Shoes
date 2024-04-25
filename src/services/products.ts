import { IProduct } from '../common/products'
import instance from '../core/Api'
import { AxiosResponse } from 'axios'
import { notification } from 'antd'
import { CustomError } from '../common/error'
import { io } from 'socket.io-client'
const socket = io('http://localhost:9000', { transports: ['websocket'] });
export const getProducts = async (
  page = 1,
  pageSize = 10,
  searchKeyword = ''
) => {
  try {
    const response: AxiosResponse = await instance.get(
      `api/product?page=${page}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    return response?.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message ||
      'Error Product while fetching products '
    notification.error({ message: errorMessage })
    throw new Error('Error Product while fetching products ')
  }
}

export const getProductById = async (id: string) => {
  try {
    const response: AxiosResponse<IProduct> = await instance.get(
      `/api/product/${id}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message ||
      'Error while fetching product by ID.'
    notification.error({ message: errorMessage })
    throw new Error('Error while fetching product by ID.')
  }
}
export const addProduct = async (
  product: IProduct
): Promise<IProduct | null> => {
  try {
    const response: AxiosResponse<IProduct> = await instance.post(
      '/api/product',
      product,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    // notification.success({ message: 'Product added successfully' })
    socket.emit("client_add_product", { message: `Product ${product.name} added successfully`, status: true });
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Error while adding product.'
    notification.error({ message: errorMessage })
    throw new Error('Error while adding product.')
  }
}

export const updatePrroduct = async (
  id: string,
  product: IProduct
): Promise<IProduct | null> => {
  try {
    const response: AxiosResponse<IProduct> = await instance.put(
      `/api/product/${id}`,
      product,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    // notification.success({ message: 'Product updated successfully' })
    socket.emit("client_update_product", { message: `Product ${product.name} updated successfully`, status: true });
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Error while updating product.'
    notification.error({ message: errorMessage })
    throw new Error('Error while updating product.')
  }
}

export const tryDeleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    const product: Partial<IProduct> = {
      isDeleted: true
    };

    const response: AxiosResponse<IProduct> = await instance.patch(
      `/api/product/${id}/delete`,
      product
    );
    notification.success({ message: "Product marked for deletion successfully" });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while marking product for deletion.";
    notification.error({ message: errorMessage });
    throw new Error("Error while marking product for deletion.");
  }
};

export const tryRestoreProduct = async (id: string): Promise<IProduct | null> => {
  try {
    const product: Partial<IProduct> = {
      isDeleted: false
    };

    const response: AxiosResponse<IProduct> = await instance.patch(
      `/api/product/${id}/restore`,
      product
    );

    notification.success({ message: "Product restored successfully" });

    return response.data || response;
  } catch (error) {
    console.log(error);

    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Error while restoring product.";

    notification.error({ message: errorMessage });

    throw new Error("Error while restoring product.");
  }
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    const response: AxiosResponse<IProduct> = await instance.delete(
      `/api/product/${id}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
    notification.success({ message: 'Product deleted successfully.' })
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Error while deleting product.'
    notification.error({ message: errorMessage })
    throw new Error('Error while deleting product.')
  }
}

export const getCategories = async () => {
  try {
    const response: AxiosResponse = await instance.get('api/categories')
    console.log(response)
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Error while fetching categories.'
    notification.error({ message: errorMessage })
    throw new Error('Error while fetching categories.')
  }
}

export const getCategoryById = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.get(`api/categories/${id}`)
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message ||
      'Error while fetching category by ID.'
    notification.error({ message: errorMessage })
    throw new Error('Error while fetching category by ID.')
  }
}




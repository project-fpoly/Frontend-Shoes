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
      ''
    notification.error({ message: errorMessage })
    throw new Error('Lỗi sản phẩm khi tìm nạp sản phẩm')
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
      'Lỗi khi tìm nạp sản phẩm theo ID.'
    notification.error({ message: errorMessage })
    throw new Error('Lỗi khi tìm nạp sản phẩm theo ID.')
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
    socket.emit("client_add_product", { message: `Sản phẩm "${product.name}" đã được thêm thành công!`, status: true });
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Lỗi khi thêm sản phẩm.'
    notification.error({ message: errorMessage })
    throw new Error('Lỗi khi thêm sản phẩm.')
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
    socket.emit("client_update_product", { message: `Sản phẩm "${product.name}" đã được cập nhật thành công!`, status: true });
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
    notification.success({ message: "Sản phẩm được đánh dấu để xóa thành công" });
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Lỗi khi đánh dấu sản phẩm để xóa.";
    notification.error({ message: errorMessage });
    throw new Error("Lỗi khi đánh dấu sản phẩm để xóa.");
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

    notification.success({ message: "Sản phẩm được khôi phục thành công" });

    return response.data || response;
  } catch (error) {
    console.log(error);

    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || "Lỗi khi khôi phục sản phẩm.";

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
    );
    socket.emit("client_delete_product", { data: response.data});
    return response.data || response;
  } catch (error) {
    console.log(error);
    const customError = error as CustomError;
    const errorMessage =
      customError.response?.data?.message || 'Lỗi khi xóa sản phẩm.';
    notification.error({ message: errorMessage });
    throw new Error('Lỗi khi xóa sản phẩm.');
  }
};

export const getCategories = async () => {
  try {
    const response: AxiosResponse = await instance.get('api/categories')
    console.log(response)
    return response.data || response
  } catch (error) {
    console.log(error)
    const customError = error as CustomError
    const errorMessage =
      customError.response?.data?.message || 'Lỗi khi tìm nạp danh mục.'
    notification.error({ message: errorMessage })
    throw new Error('Lỗi khi tìm nạp danh mục.')
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
      'Lỗi khi tìm nạp danh mục theo ID.'
    notification.error({ message: errorMessage })
    throw new Error('Lỗi khi tìm nạp danh mục theo ID.')
  }
}




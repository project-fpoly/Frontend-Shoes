import axios, { AxiosResponse } from "axios";
import instance from '../core/Api'

export interface LoginRequest {
  username: string;
  secret: string;
}
interface APIResponse {
  message: string;
}
export interface RegisterRequest {
  username?: string;
  secret: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export const registerUserChat = async (username: string, secret: string, email: string, firstName: string, lastName: string) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found in localStorage');
    }

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`,
    };

    // Sử dụng thông tin người dùng để đăng ký vào hệ thống chat
    const registrationData = {
      username: username || email || '',
      secret: secret,
      email: email || '',
      first_name: firstName || userId,
      last_name: lastName || ''
    };

    const response: AxiosResponse = await instance.post('/api/chat/signup', registrationData, { headers });

    return response.data as APIResponse;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}


export const loginUserChat = async (username: string, password: string) => {
  try {

    const userData: LoginRequest = {
      username: username,
      secret: password,
    };

    // Lấy accessToken từ localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found in localStorage');
    }

    // Tạo header
    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`,
    };

    const response: AxiosResponse = await instance.post('/api/chat/login', userData, { headers });
    return response.data
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}

export const getAllUsersChat = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found in localStorage');
    }

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`,
    };

    const response: AxiosResponse = await instance.get('/api/chat/all', { headers });
    return response.data
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}

export const deleteUserChat = async (userId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found in localStorage');
    }

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`,
    };

    const response: AxiosResponse = await instance.delete(`/api/chat/delete/${userId}`, { headers });
    return response.data as APIResponse;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}


export const getUserByEmailChat = async (email: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found in localStorage');
    }

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`,
    };

    const response: AxiosResponse = await instance.get(`/api/chat/userByEmail/${email}`, { headers });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
import intansce from "./intansce";
import IUser from "./../types/user";
import { AxiosResponse } from "axios";
import instance from "../core/Api";
import { IUsers } from "../common/users";
import { notification } from "antd";
import { CustomError } from "../common/error";

export const Signup = (data: IUser) => {
  return intansce.post("/auth/signup", data);
};

export const Signin = (data: IUser) => {
  return intansce.post("/auth/signin", data);
};

export const ForgotPass = (data: IUser) => {
  return intansce.post("/auth/forgotpassword", data);
};
export const getUsers = async (page = 1, pageSize = 10, search = "")=> {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/auth/users?page=${page}&pageSize=${pageSize}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const createUsers = async (newUser:IUsers) => {
  try {
    const response: AxiosResponse< {newUser:IUsers[]; message: string;} > = await instance.post(
      "/api/auth/create",newUser,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response);
    notification.success({message:response.data.message})
    return response.data.newUser;
  } catch (error) {
    return console.error(error);
  }
};
export const updateUsers = async (newUser: IUsers, id: string) => {
  try {
    const response: AxiosResponse<{ message: string; newUser: IUsers[] }> = await instance.put(
      `/api/auth/users/${id}`, newUser,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    notification.success({ message: response.data.message });
    return response.data.newUser;
  } catch (error) {
    const customError = error as CustomError;
    const errorMessage = (customError.response?.data?.message) || 'Update failed';
    notification.error({ message: errorMessage });
    throw error;
  }
};
export const deleteUsers = async (userIds: string[]) => {
  try {
    const response: AxiosResponse = await instance.delete('/api/auth/more-users', {
      data: { userIds },
    });
    notification.success(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

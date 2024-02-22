import intansce from "./intansce";
import IUser from "./../types/user";
import { AxiosResponse } from "axios";
import instance from "../core/Api";
import { IUsers } from "../common/users";

export const Signup = (data: IUser) => {
  return intansce.post("/auth/signup", data);
};

export const Signin = (data: IUser) => {
  return intansce.post("/auth/signin", data);
};

export const ForgotPass = (data: IUser) => {
  return intansce.post("/auth/forgotpassword", data);
};
export const getUsers = async () => {
  try {
    const response: AxiosResponse<{ docs: IUser[] }> = await instance.get(
      "/api/auth/users"
    );
    return response.data.docs;
  } catch (error) {
    console.error(error);
  }
};
export const createUsers = async (newUser:IUsers) => {
  try {
    const response: AxiosResponse< {newUser:IUsers[]} > = await instance.post(
      "/api/auth/create",newUser
    );
    console.log(response);
    return response.data.newUser;
  } catch (error) {
    return console.error(error);
  }
};
export const updateUsers = async (newUser:IUsers,id:string) => {
  try {
    const response: AxiosResponse< {newUser:IUsers[]} > = await instance.put(
      `/api/auth/users/${id}`,newUser
    );
    console.log(response);
    return response.data.newUser;
  } catch (error) {
    return console.error(error);
  }
};

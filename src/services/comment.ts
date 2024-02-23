import { AxiosResponse } from "axios";
import instance from "../core/Api";
import { ICmt } from "../common/products";
export const getComment = async () => {
  try {
    const response: AxiosResponse<{ docs: ICmt[] }> = await instance.get(
      "/api/comments/all"
    );
    return response.data.docs;
  } catch (error) {
    console.error(error);
  }
};
// export const createUsers = async (newUser:IUsers) => {
//   try {
//     const response: AxiosResponse< {newUser:IUsers[]} > = await instance.post(
//       "/api/auth/create",newUser
//     );
//     console.log(response);
//     return response.data.newUser;
//   } catch (error) {
//     return console.error(error);
//   }
// };
// export const updateUsers = async (newUser: IUsers, id: string) => {
//   try {
//     const response: AxiosResponse<{ message: string; newUser: IUsers[] }> = await instance.put(
//       `/api/auth/users/${id}`, newUser
//     );
//     notification.success({ message: response.data.message });
//     return response.data.newUser;
//   } catch (error) {
//     const customError = error as CustomError;
//     const errorMessage = (customError.response?.data?.message) || 'Update failed';
//     notification.error({ message: errorMessage });
//     throw error;
//   }
// };
// export const deleteUsers = async (userIds: string[]) => {
//   try {
//     const response: AxiosResponse = await instance.delete('/api/auth/more-users', {
//       data: { userIds },
//     });
//     notification.success(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

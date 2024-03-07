import { AxiosResponse } from "axios";
import instance from "../core/Api";

export const getAllNotification = async () => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/notification/all`,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json; charset=UTF-8"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getOneNotification = async (id:string) => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/notification/one/${id}`,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "application/json; charset=UTF-8"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const createNotification = async (data: INotification) => {
//   try {
//     const response: AxiosResponse< {data:INotification[]; message: string;} > = await instance.post(
//       "/api/auth/create",data,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     console.log(response);
//     notification.success({message:response.data.message})
//     return response.data.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const updateNotification = async (id: string) => {
  try {
    const response: AxiosResponse = await instance.put(
      `/api/notification/update/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const deleteUsers = async (userIds: string[]) => {
//   try {
//     const response: AxiosResponse = await instance.delete(
//       "/api/auth/more-users",
//       {
//         data: { userIds },
//       }
//     );
//     notification.success(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
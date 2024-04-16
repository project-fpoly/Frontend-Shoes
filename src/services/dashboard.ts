import { AxiosResponse } from "axios";
import instance from "../core/Api";


export const getLists = async () => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/dashboard/list`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
    );
    return response.data || response;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching Sale.");
  }
};
export const getChart = async (id:string) => {
    try {
      const response: AxiosResponse = await instance.get(
        `/api/dashboard/data/${id}?startTime=2024-04-03&endTime=2024-04-09`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error while fetching Sale.");
    }
  };

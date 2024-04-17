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
export const getChart = async (id:string,start:any,end:any) => {
    try {
      const response: AxiosResponse = await instance.get(
        `/api/dashboard/data/${id}?startTime=${start}&endTime=${end}`,
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

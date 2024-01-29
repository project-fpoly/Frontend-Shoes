import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://65b5551841db5efd28679b4d.mockapi.io/api/v1",
});

instance.interceptors.request.use(
  (config) => {
    // console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    console.error("Response Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default instance;

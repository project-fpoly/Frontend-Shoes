import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
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
    return response.data.data;
  },
  (error) => {
    console.error("Response Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default instance;

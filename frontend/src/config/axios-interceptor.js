import axios from "axios";

const AxiosInterceptor = axios.create({
  baseURL: process.env.BACKEND_BASE_URL || "http://localhost:2233",
});

// Add a request interceptor
AxiosInterceptor.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const sessionData = JSON.parse(sessionStorage.getItem("userToken"));
    if (sessionData) {
      config.headers.authorization = "Bearer " + sessionData;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInterceptor.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { AxiosInterceptor };

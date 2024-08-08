import axios, { AxiosInstance } from "axios";


const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8081/",
    timeout: 3000,
});
// export const _axios: AxiosInstance = axios.create({
//     timeout: 3000,
// });



export const $axios = axiosInstance;
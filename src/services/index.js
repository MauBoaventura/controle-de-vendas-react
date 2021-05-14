import axios from "axios";
// import { getBaseURL } from "../config";

export const client = axios.create({
  baseURL: process.env.NODE_ENV !== 'production'?'http://localhost:3035':'https://controledevenda.herokuapp.com',
  headers: {
    "Content-Type": "application/json"
  }
});

// for multiple requests
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// client.interceptors.request.use(
//   async config => {
//     const access = localStorage.getItem("AccessToken");
//     if (access) {
//       config.headers = {
//         Authorization: `JWT ${access}`,
//         "Content-Type": "application/json"
//       };
//     }
//     config.baseURL = await getBaseURL();
//     return config;
//   },
//   error => Promise.reject(error)
// );

// client.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     const originalRequest = error.config;

//     if (
//       parseInt(error.response.status) >= 400 &&
//       originalRequest.url === "/refresh/"
//     ) {
//       window.location.href = "/login/";
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function(resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(access => {
//             originalRequest.headers["Authorization"] = "JWT " + access;
//             return client(originalRequest);
//           })
//           .catch(err => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       const refresh = window.localStorage.getItem("RefreshToken");
//       const access = window.localStorage.getItem("AccessToken");
//       return new Promise(function(resolve, reject) {
//         client
//           .post("/refresh/", {
//             refresh,
//             access
//           })
//           .then(({ data }) => {
//             window.localStorage.setItem("AccessToken", data.access);
//             window.localStorage.setItem("RefreshToken", data.refresh);
//             client.defaults.headers.common["Authorization"] =
//               "JWT " + data.access;
//             originalRequest.headers["Authorization"] = "JWT " + data.access;
//             processQueue(null, data.access);
//             resolve(client(originalRequest));
//           })
//           .catch(err => {
//             processQueue(err, null);
//             reject(err);
//           })
//           .then(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );

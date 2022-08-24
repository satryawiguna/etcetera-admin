import axios from 'axios';
import {setCookie, getCookie, hasCookie} from 'cookies-next';

const Api = () => {
    const defaultOptions = {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(
        config => {
            if (hasCookie('__etcat__')) {
                config.headers['Authorization'] = `Bearer ${getCookie('__etcat__')}`;
            }

            return config;
        },
        error => {
            Promise.reject(error)
        });

    // =========================================================
    // We need this to implement auto refresh token if necessary
    // =========================================================
    //
    // instance.interceptors.response.use((response) => {
    //     return response
    // }, function (error) {
    //     const originalRequest = error.config;
    //
    //     if (error.response.status === 401 &&
    //         originalRequest.url === 'http://dummydomain.com/auth/token') {
    //
    //         return Promise.reject(error);
    //     }
    //
    //     if (error.response.status === 401 && !originalRequest._retry) {
    //         originalRequest._retry = true;
    //
    //         return axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/refreshToken`, {
    //                 "refresh_token": (hasCookie('__etcrt__')) ? getCookie('__etcrt__') : ""
    //             })
    //             .then(response => {
    //                 if (response.status === 201) {
    //                     setCookie('__etcat__', response.data.token.access_token);
    //                     setCookie('__etcrt__', response.data.token.refresh_token);
    //
    //                     axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.access_token;
    //
    //                     return axios(originalRequest);
    //                 }
    //             })
    //     }
    //
    //     return Promise.reject(error);
    // });

    return instance;
}

export default Api();
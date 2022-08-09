import axios from 'axios';
import nookies, {parseCookies} from "nookies";


const Api = (ctx) => {
    const cookies = parseCookies(ctx);
    const accessToken = cookies.__etcat__;
    const refreshToken = cookies.__etcrt__;

    const defaultOptions = {
        baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(
        config => {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }

            return config;
        },
        error => {
            Promise.reject(error)
        });

    instance.interceptors.response.use((response) => {
        return response
    }, function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 &&
            originalRequest.url === 'http://dummydomain.com/auth/token') {

            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return axios.post('/auth/token',
                {
                    "refresh_token": refreshToken
                })
                .then(response => {
                    if (response.status === 201) {
                        nookies.set(null, '__etcat__', response.data.token.access_token);
                        nookies.set(null, '__etcrt__', response.data.token.refresh_token);

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.access_token;

                        return axios(originalRequest);
                    }
                })
        }
        return Promise.reject(error);
    });

    return instance;
}

export default Api();
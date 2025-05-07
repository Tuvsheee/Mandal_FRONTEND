import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api/v1",
    // baseURL: "https://jinst.tanuweb.cloud/api/v1",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token: any = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
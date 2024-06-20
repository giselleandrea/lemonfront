import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000', // Base URL del backend
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
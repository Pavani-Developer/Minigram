import axios from 'axios';
import { ACCESS_TOKEN } from './constants';


const api = axios.create({
    baseURL: 'https://pavanipampana.pythonanywhere.com/'
})

// This interceptor is executed before each request is sent. It checks if there is an access token stored in the local storage (localStorage) using the key ACCESS_TOKEN.

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
)

export default api;
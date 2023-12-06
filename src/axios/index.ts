import axios from 'axios';

export const backendAxios = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000
});
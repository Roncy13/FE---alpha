import axios from 'axios';

export const backendAxios = axios.create({
    baseURL: 'http://157.245.53.50:4000',
    timeout: 5000
});
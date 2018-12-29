import Axios from 'axios';

export const generateNArray = (N) => Array(N)
    .fill(0)
    .map( (el, i) => i + 1);

export const axios = Axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});
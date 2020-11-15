import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.31.48:3001",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});

export default api;
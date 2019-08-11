import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/';
const Axios = {};
if (process.env.NODE_ENV !== 'test') {
  Axios.instance = axios.create({
    baseURL,
    responseType: 'json'
  });
} else {
  Axios.instance = axios;
}

export default Axios.instance;

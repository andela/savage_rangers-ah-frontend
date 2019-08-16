import axios from 'axios';

const baseURL = 'http://localhost:3000';
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

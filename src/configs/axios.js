import axios from 'axios';

const baseURL = 'https://authors-heaven.herokuapp.com';
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

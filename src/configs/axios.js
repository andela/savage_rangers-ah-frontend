import axios from 'axios';

const Axios = {};
if (process.env.NODE_ENV !== 'test') {
  Axios.instance = axios.create({ baseURL: 'https://authors-heaven.herokuapp.com/' });
} else {
  Axios.instance = axios;
}
export default Axios.instance;

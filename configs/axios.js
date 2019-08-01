import axios from 'axios';

let instance;
if (process.env.NODE_ENV !== 'test') {
  instance = axios.create({
    baseURL: 'https://authors-heaven.herokuapp.com/'
  });
} else {
  instance = axios;
}
export default instance;

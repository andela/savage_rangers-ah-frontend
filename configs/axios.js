
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://authors-heaven.herokuapp.com',
});

export default instance;

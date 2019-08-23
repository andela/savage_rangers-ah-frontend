import axios from 'axios';

const Axios = {};
if (process.env.NODE_ENV !== 'test') {
<<<<<<< HEAD
  Axios.instance = axios.create({ baseURL: 'https://authors-heaven.herokuapp.com/' });
=======
  Axios.instance = axios.create({ baseURL });
>>>>>>> ft-optin-optout-notifications-166240795
} else {
  Axios.instance = axios;
}
export default Axios.instance;

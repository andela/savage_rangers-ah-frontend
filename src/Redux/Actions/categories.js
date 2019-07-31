import types from '.';
import Axios from '../../../configs/axios';

const { GET_CATEGORIES } = types;

export default state => dispatch =>{
    Axios.get('/api/category')
    .then(res=> {
        dispatch({type: GET_CATEGORIES, state: res.data.categories})
    })
}
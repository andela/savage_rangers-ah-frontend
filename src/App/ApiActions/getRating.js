import axios from '../../configs/axios';

export default async slug => axios
  .get(`/api/articles/${slug}/ratings/statistics`)
  .then(response => response.data.data)
  .catch(() => 0);

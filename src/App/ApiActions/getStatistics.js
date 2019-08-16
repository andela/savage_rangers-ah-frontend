import axios from '../../configs/axios';

export default async slug => axios
  .get(`/api/articles/${slug}/stats`)
  .then(response => response.data.article)
  .catch(() => 0);

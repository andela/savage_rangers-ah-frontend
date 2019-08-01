import axiosInstance from '../../../configs/axios';

export default async () => {
  const res = await axiosInstance.get('');
  return true;
}

import axiosInstance from '../../configs/axios';

export default async () => {
  await axiosInstance.get('');
  return true;
};

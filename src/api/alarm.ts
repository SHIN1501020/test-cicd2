import axios from 'axios';
import Cookies from 'js-cookie';

export const toggleAlarm = async (productId: number | undefined) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    await axios.post(`${import.meta.env.VITE_API_KEY}/notification/product/${productId}`);
    console.log('post 성공');
  } catch (err) {
    console.log(err);
  }
};

export const getAlarmProducts = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/notification`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

import axios from 'axios';
import Cookies from 'js-cookie';

export const getUserinfo = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/mypage`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const postUserinfo = async ({ name, imageFile }: { name: any; imageFile: any }) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  console.log(accessToken);

  const formData = new FormData();
  formData.set('nickname', name);
  formData.set('file', imageFile);

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    await axios.put(`${import.meta.env.VITE_API_KEY}/mypage`, formData);
  } catch (err) {
    console.log(err);
  }
};

import Cookies from 'js-cookie';
import axios from 'axios';

// 카카오 로그인
export const loginWithKakao = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_KEY}` || 'http://localhost:5173';
  const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
    `${SERVER_URL}/api/kakao/callback`
  )}&client_id=1b3c349efac233223cb5b44ca84c0ff6`;
  window.location.href = kakaoOauthURL;
};

// 카카오 회원 탈퇴
export const DeleteIdWithKakao = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  console.log(accessToken, '탈퇴 토큰');
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_KEY}/kakao/deactivate`, { headers: { Authorization: accessToken } });
    return response;
  } catch (error) {
    console.error('회원 탈퇴 에러', error);
  }
};

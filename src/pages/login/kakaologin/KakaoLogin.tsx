import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const queryString = url.searchParams; // URLSearchParams {size: 1}
  const accessToken = 'Bearer ' + queryString.get('Authorization');

  useEffect(() => {
    document.cookie = `Authorization=${accessToken}; max-age=17999`;
    navigate('/');
  }, []);

  return <div></div>;
}

export default KakaoLogin;

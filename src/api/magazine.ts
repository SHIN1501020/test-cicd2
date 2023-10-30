import axios from 'axios';
import Cookies from 'js-cookie';

// 매거진 데이터 조회
export const getMagazine = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/magazines`, { headers: { Authorization: accessToken } });
    const responseData = response.data.data;
    const admin = response.data.access;
    return { data: responseData, admin: admin };
  } catch (error) {
    console.error('매거진 데이터 조회 에러', error);
  }
};

// 매거진 상세 조회
export const getMagazineDetail = async (id: any) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/magazines/${id}`, { headers: { Authorization: accessToken } });
    const responseData = response.data.data;
    const admin = response.data.access;
    return { data: responseData, admin: admin };
  } catch (error) {
    console.error('매거진 상세 데이터 조회 에러', error);
  }
};

// 매거진 등록
export const postMagazine = async ({ title, content, image }: { title: any; content: any; image: any }) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);

    const response = await axios.post(`${import.meta.env.VITE_API_KEY}/magazines`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('매거진 작성 에러', error);
    throw error;
  }
};

// 매거진 수정
export const putMagazine = async (props: any) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  const { id, newTitle, newContent, newMainImage } = props;
  const formData = new FormData();
  formData.set('title', newTitle);
  formData.set('content', newContent);
  formData.set('file', newMainImage);

  try {
    const response = await axios.put(`${import.meta.env.VITE_API_KEY}/magazines/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: accessToken,
      },
    });
    return response;
  } catch (error) {
    console.error('매거진 수정 에러', error);
    throw error;
  }
};

// 매거진 삭제
export const deleteMagazine = async (props: any) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  const id = props.id;
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_KEY}/magazines/${id}`, { headers: { Authorization: accessToken } });
    return response;
  } catch (error) {
    console.error('매거진 삭제 에러', error);
  }
};

// 매거진 좋아요 등록/취소
export const postMagazineLike = async (props: any) => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  const id = props.id;

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_KEY}/magazines/${id}/like`, { headers: { Authorization: accessToken } });
    return response;
  } catch (error) {
    console.error('매거진 좋아요 등록/취소 에러', error);
  }
};

// 다른 매거진 리스트 조회
export const getAnotherMagazine = async (id: any) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/magazines/${id}/list`);
    return response;
  } catch (error) {
    console.error('다른 매거진 리스트 조회 에러', error);
  }
};

// 좋아요 한 매거진 조회
export const getLikedMagazineLists = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/magazines/like`, { headers: { Authorization: accessToken } });
    return response;
  } catch (error) {
    console.error('좋아요 한 매거진 리스트 조회 에러', error);
  }
};

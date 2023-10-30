import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// 상품 전체 조회

export const getProducts = async (isSoldout: boolean) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/product?isOutOfStock=${isSoldout}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 상품 상세 조회

export const getProduct = async (productId: string | undefined) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    console.log(productId);
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/product/${productId}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 할인율 상위권 10위

export const getTopten = async () => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/product/top`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 카테고리별 상품

export const getCategory = async (categoryName: string | undefined, isSoldout: boolean) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/product/category/${categoryName}?isOutOfStock=${isSoldout}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 카테고리 안에 필터

export const getCategoryFilter = async (categoryName: string | undefined, filterName: string | undefined, isSoldout: boolean) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    console.log(categoryName, filterName);
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/product/category/${categoryName}/${filterName}?isOutOfStock=${isSoldout}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 상품 옵션

export const getOptions = async (realId: string | undefined) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/option/${realId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 유사 상품 보기

export const getSimilarProducts = async (productId: string | undefined) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/product/${productId}/similar`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 검색 상품

export const getSearch = async (searchWord: string | undefined, isSoldout: boolean) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    console.log(searchWord);
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/search?search=${searchWord}&isOutOfStock=${isSoldout}`);
    return response.data.data;
  } catch (err) {
    toast.error('찾으시는 상품이 존재하지 않습니다.');
    console.log(err);
  }
};

// 검색한 상품 필터 -----------------------------------------------------------------------------

export const getFilteredSearch = async (filterName: string | undefined, searchWord: string | undefined, isSoldout: boolean) => {
  const accessToken: string | undefined = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  try {
    console.log(filterName, searchWord);
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/search/${filterName}?search=${searchWord}&isOutOfStock=${isSoldout}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

//차트

export type PriceData = {
  maxPrice: number;
  minPrice: number;
  priceHistoryForWeek: {
    [date: string]: number;
  };
};

export const getPriceHistory = async (id: any): Promise<PriceData | undefined> => {
  // console.log(id, 'api는 id값이 나올까?');
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/price-history/${id}`);
    return response.data;
  } catch (error) {
    console.error('가격 히스토리 에러', error);
    return undefined;
  }
};

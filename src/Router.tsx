import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Main from './pages/main/Main';
import Error from './components/Error';

// 로그인
const Login = React.lazy(() => import('./pages/login/Login'));
const YetLogin = React.lazy(() => import('./pages/login/YetLogin'));
const KakaoLogin = React.lazy(() => import('./pages/login/kakaologin/KakaoLogin'));

// 상품 검색, 상세, 알림
const SearchPage = React.lazy(() => import('./pages/search/SearchPage'));
const Detail = React.lazy(() => import('./pages/detail/Detail'));
const Notification = React.lazy(() => import('./pages/notification/Notification'));

// 마이페이지
const MyPage = React.lazy(() => import('./pages/mypage/main/MyPage'));
const EditMypage = React.lazy(() => import('./pages/mypage/edit/EditMypage'));

// 매거진
const MagazineMain = React.lazy(() => import('./pages/magazine/magazineMain/MagazineMain'));
const MagazineWriting = React.lazy(() => import('./pages/magazine/magazineWriting/MagazineWriting'));
const MagazineEditing = React.lazy(() => import('./pages/magazine/magazineWriting/MagazineEditing'));
const MagazineDetail = React.lazy(() => import('./pages/magazine/magazineDetail/MagazineDetail'));
const LikeMagazine = React.lazy(() => import('./pages/likeMagazine/LikeMagazine'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'yetlogin',
        element: <YetLogin />,
      },
      {
        path: 'kakaologin',
        element: <KakaoLogin />,
      },
      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: 'search/:searchWord',
        element: <SearchPage />,
        errorElement: <Main />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'editmypage',
        element: <EditMypage />,
      },
      {
        path: 'detail/:id',
        element: <Detail />,
        errorElement: <Error />,
      },
      {
        path: 'magazine',
        element: <MagazineMain />,
      },
      {
        path: '/magazine/:id',
        element: <MagazineDetail />,
      },
      {
        path: 'magazineWriting',
        element: <MagazineWriting />,
      },
      {
        path: 'magazineEditing/:id',
        element: <MagazineEditing />,
      },
      {
        path: '/search/:searchWord',
        element: <SearchPage />,
      },
      {
        path: 'likemagazine',
        element: <LikeMagazine />,
      },
    ],
  },
]);

export default router;

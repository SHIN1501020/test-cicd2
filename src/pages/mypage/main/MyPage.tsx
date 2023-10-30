import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getUserinfo } from '../../../api/mypage';

import PageFooter from '../../../components/footer/PageFooter';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

import Cookies from 'js-cookie';

function Mypage() {
  // 네비게이트 ----------------------------------------

  const navigate = useNavigate();

  // 서버로 유저정보 가져오기 -----------------------------------

  const { data, status } = useQuery('userInfo', getUserinfo);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 로그아웃(토큰 쿠키에서 지우기)----------------------------

  const logout = () => {
    Cookies.remove('Authorization');
    navigate('/');
  };

  const accessToken = Cookies.get('Authorization');
  // console.log(accessToken);

  return (
    <div>
      <Header>
        <h3>마이페이지</h3>
      </Header>
      <Wrap>
        <Title>안녕하세요 {data.nickname}님</Title>
        <Profile>
          <ProfileImage src={data.image} />
          <ImageInput $imageSrc={data.image} accept='image/*' multiple type='file' id='profileImg'></ImageInput>
          <EditProfileImage onClick={() => navigate(`/editmypage`)}>프로필 수정</EditProfileImage>
        </Profile>
        <Article onClick={() => navigate('/likemagazine')}>좋아요한 매거진 보기</Article>
        {accessToken ? <Article onClick={logout}>로그아웃</Article> : <Article onClick={() => navigate('/login')}>로그인하러 가기</Article>}
      </Wrap>
      <PageFooter />
    </div>
  );
}

export default Mypage;

const Header = styled.div`
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrap = styled.div`
  height: 600px;
`;

const Title = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
`;

const Profile = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInput = styled.input<{ $imageSrc: string }>`
  display: ${({ $imageSrc }) => ($imageSrc ? 'none' : 'none')};
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  background-color: rgba(217, 217, 217, 1);
  object-fit: cover;
`;

const EditProfileImage = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Article = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
`;

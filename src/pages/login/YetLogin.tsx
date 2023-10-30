import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PageFooter from '../../components/footer/PageFooter';

type Props = {};

function YetLogin({}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h3>로그인 / 회원가입</h3>
      </Header>
      <Wrap>
        <Content>
          <h2>내일은 최저가</h2>
          <span>서비스 이용을 위해 로그인 해주세요.</span>
          <LoginButton
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </LoginButton>
        </Content>
      </Wrap>
      <PageFooter />
    </>
  );
}

export default YetLogin;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom, rgba(205, 205, 205, 0.4), white);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  position: absolute;
  top: 190px;
  span {
    font-size: 16px;
  }
`;

const LoginButton = styled.button`
  width: 299px;
  height: 56px;
  border: none;
  border-radius: 9px;
  background-color: rgba(217, 217, 217, 1);
  margin-top: 65px;
`;

import styled from 'styled-components';
import MagazineItem from './MagazineItem';
import PageFooter from '../../components/footer/PageFooter';
import { GreyBackIcon } from '../../assets/icon/icon';
import { useNavigate } from 'react-router';

const LikeMagazine = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header>
        <StyledBackButton onClick={() => navigate('/mypage')}>
          <GreyBackIcon />
        </StyledBackButton>
        <Title>좋아요 한 매거진</Title>
        <div></div>
      </Header>
      <LikeMagazineList>
        <MagazineItem></MagazineItem>
      </LikeMagazineList>
      <PageFooter />
    </div>
  );
};

export default LikeMagazine;

const Header = styled.div`
  width: 375px;
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 110%;
`;

const LikeMagazineList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 95.858px;
  flex-shrink: 0;
  margin-right: 35px;
`;

const StyledBackButton = styled.button`
  background-color: transparent;
  border: none;
`;

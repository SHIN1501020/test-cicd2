import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getLikedMagazineLists } from '../../api/magazine';
import { useNavigate } from 'react-router';

const MagazineItem = () => {
  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery('likeData', getLikedMagazineLists);
  const navigate = useNavigate();

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      {data?.data.data.map((item: any, index: any) => (
        <Item
          key={index}
          style={{ backgroundImage: `url(${item.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
          onClick={() => navigate(`/magazine/${item.magazineId}`)}
        >
          <Overlay>
            <ItemMargin>
              <Title>{item.title}</Title>
              <Editor>by 관리자</Editor>
            </ItemMargin>
          </Overlay>
        </Item>
      ))}
    </>
  );
};

export default MagazineItem;

const Item = styled.button`
  width: 100%;
  height: 125px;
  background-color: rgba(217, 217, 217, 1);
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: none;
`;

const Title = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 110%;
  margin-bottom: 12px;
  display: flex;
`;

const Editor = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 110%;
  text-align: left;
`;

const ItemMargin = styled.div`
  margin-top: 60px;
  margin-left: 20px;
  margin-bottom: 23px;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

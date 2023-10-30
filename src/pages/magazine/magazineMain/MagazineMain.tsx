import { useNavigate } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import PageFooter from '../../../components/footer/PageFooter';
import { useState, useEffect } from 'react';
import { getMagazine } from '../../../api/magazine';
import { useQuery } from 'react-query';
import { BlueLogo } from '../../../assets/icon/icon';
import styled from 'styled-components';
import { useLike } from '../../../hooks/useLike';
import Like from '../Like';

const Magazine: React.FC<MagazineProps> = () => {
  const [magazines, setMagazines] = useState<any[]>([]);
  const navigate = useNavigate();

  // 매거진 데이터 불러오기
  const { isLoading, isError, data } = useQuery('magazineData', getMagazine);
  const isAdmin = data?.admin;

  useEffect(() => {
    if (data) {
      const responseData = data.data;
      setMagazines(responseData);
    }
  }, [data]);

  // 좋아요 클릭 시 좋아요 상태와 좋아요 수 업데이트
  const { handleLikeClick } = useLike(false, 0);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <Header>
        <BlueLogo />
        <LogoTitle>매거진</LogoTitle>
      </Header>
      <Container>
        <Line></Line>
        <Title>Apple 트렌드</Title>
        <Subtitle>IT 트렌드, 여기서 볼 수 있어요</Subtitle>
        {isAdmin && <Writing onClick={() => navigate('/magazineWriting')}>글쓰기</Writing>}
        <div>
          <Scroll>
            {magazines?.map((magazineData, index) => (
              <Item key={magazineData.magazineId}>
                <Box key={index} onClick={() => navigate(`/magazine/${magazineData.magazineId}`, { state: { index } })}>
                  <Img src={magazineData.mainImage} />
                  <BoxPadding>
                    <BoxTitle>{magazineData.title}</BoxTitle>
                    <Content>{magazineData.content.length > 53 ? `${magazineData.content.substring(0, 53)}...` : magazineData.content}</Content>
                    <Flex>
                      <div>{magazineData.editor}</div>
                      <Like
                        isLiked={magazineData.isLiked}
                        magazineId={magazineData.magazineId}
                        likeCount={magazineData.LikeMagazine}
                        handleLikeClick={(event) => handleLikeClick(event, magazineData.magazineId, index, setMagazines)}
                        index={index}
                      />
                    </Flex>
                  </BoxPadding>
                </Box>
              </Item>
            ))}
          </Scroll>
        </div>
      </Container>
      <PageFooter />
    </>
  );
};

export default Magazine;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f3;
  max-height: 85vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18.72px 282px 18.72px 20px;
  width: 150px;
`;

const Scroll = styled.div`
  width: 380px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
  max-height: 75vh;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const LogoTitle = styled.div`
  font-size: 1.17em;
  font-weight: 600;
  line-height: 110%;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  padding-top: 17.82px;
  padding-left: 40px;
  line-height: 100%;
`;

const Line = styled.div`
  border-top: 1px solid grey;
`;

const Subtitle = styled.div<{ isAdmin?: boolean }>`
  font-size: 14px;
  color: grey;
  margin-top: 1%;
  font-weight: 600;
  text-align: left;
  width: 100%;
  margin-left: 40px;
  margin-bottom: ${(props) => (props.isAdmin ? '0px' : '20px')};
`;

const Writing = styled.div`
  width: 323px;
  font-size: 18px;
  font-weight: 600;
  color: #b5b5b5;
  cursor: pointer;
  margin-bottom: 12px;
  text-align: right;
  line-height: 110%;
  text-decoration-line: underline;
  display: flex;
  justify-content: flex-end;
`;

const Box = styled.div`
  width: 335px;
  height: 315px;
  margin-bottom: 26px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const Img = styled.img`
  width: 335px;
  height: 60%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
`;

const BoxPadding = styled.div`
  padding: 5% 3% 5% 3%;
`;

const BoxTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  margin: 1% 0% 1% 0%;
  font-size: 14px;
  font-weight: 400;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
`;

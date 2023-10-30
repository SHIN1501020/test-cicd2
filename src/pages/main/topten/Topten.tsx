import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getTopten } from '../../../api/product';

import ToptenProduct from './ToptenProduct';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

function Topten() {
  const slideRef = useRef(null);
  const [index, setIndex] = useState<number>(0); // 인덱스를 만들어줍니다.
  const [isSlide, setIsSlide] = useState<boolean>(false); // 슬라이드 중인지 체크해줍니다. 슬라이드 중에 여러번 빠르게 클릭 못하게 하는 역할
  const [x, setX] = useState(0); // css 에서 슬라이드 애니메이션 효과를 주기위해 x 만큼 이동시키는 역할입니다.

  // 자동 넘기기---------------------------------------------------

  useEffect(() => {
    const autoPage = setTimeout(() => {
      setX(-264); // 애니메이션 효과를 주기 위해 x 만큼 이동합니다.
      setIsSlide(true); // 버튼클릭으로 직접 슬라이드할 수 있습니다.
      setTimeout(() => {
        setIndex((prev) => (prev === 9 ? 0 : prev + 1)); // Carousel 위한 index 새로고침입니다.
        setX(0); // 한 칸씩 움직여야 하기 때문에 멈춥니다.
        setIsSlide(false); // autoPage 에 의해 자동으로 슬라이드가 움직이고, 멈췄으므로 다시 슬라이드를 진행할 수 있는 상태로 바꿔줍니다.
      }, 500);
    }, 3500);
    return () => {
      clearTimeout(autoPage); // 우연치 않게 로직이 겹치는 것을 방지합니다.
    };
  }, [index]); // index 값이 변경될 때마다 실행합니다.(= 3.5초 지나면, 다시 실행.)

  // 할인율 상위 10위 API ----------------------------------------------------------

  const { isError, isLoading, data } = useQuery('topProduct', getTopten);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  // 오른쪽 넘기기---------------------------------------------------

  const increaseClick = () => {
    if (isSlide) {
      return;
    }
    setX(-264);
    setIsSlide(true);
    setTimeout(() => {
      setIndex((prev) => (prev === 9 ? 0 : prev + 1));
      setX(0);
      setIsSlide(false);
    }, 500);
  };

  // 왼쪽 넘기기---------------------------------------------------

  const decreaseClick = () => {
    if (isSlide) {
      return;
    }
    setX(+264);
    setIsSlide(true);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? 9 : prev - 1));
      setX(0);
      setIsSlide(false);
    }, 500);
  };

  // preview 위한 순서 index ------------------------------------------

  const morePrevIndex = index === 1 ? 9 : index === 0 ? 8 : index - 2;
  const PrevIndex = index === 0 ? 9 : index - 1;
  const NextIndex = index === 9 ? 0 : index + 1;
  const moreNextIndex = index === 9 ? 1 : index === 8 ? 0 : index + 2;

  // 화면 ----------------------------------------------------------------

  return (
    <Wrapper>
      <LeftButton type='button' onClick={decreaseClick}>
        <i className='fas fa-chevron-left'></i>
      </LeftButton>
      <Row
        key={index}
        ref={slideRef}
        style={{
          transform: `translateX(${x}px)`,
        }}
      >
        <Container>
          <PrivewProductWrap>
            <ToptenProduct {...data[morePrevIndex]} index={morePrevIndex} />
          </PrivewProductWrap>
        </Container>
        <Container>
          <PrivewProductWrap>
            <ToptenProduct {...data[PrevIndex]} index={PrevIndex} />
          </PrivewProductWrap>
        </Container>
        <IndexWrapper>
          <ProductWrap>
            <ToptenProduct {...data[index]} index={index} />
          </ProductWrap>
        </IndexWrapper>
        <Container>
          <PrivewProductWrap>
            <ToptenProduct {...data[NextIndex]} index={NextIndex} />
          </PrivewProductWrap>
        </Container>
        <Container>
          <PrivewProductWrap>
            <ToptenProduct {...data[moreNextIndex]} index={moreNextIndex} />
          </PrivewProductWrap>
        </Container>
      </Row>

      <RightButton type='button' onClick={increaseClick}>
        <i className='fas fa-chevron-right'></i>
      </RightButton>
    </Wrapper>
  );
}

export default React.memo(Topten);

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  position: relative;
  width: 375px;
  height: 375px;
`;

const Container = styled.div`
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin: 0 -3.5px;
  cursor: pointer;
  position: relative;
`;

const Row = styled.div`
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
`;

const ProductWrap = styled.div`
  border-radius: 15px;
  margin: 0 6px;
  position: relative;
  cursor: pointer;
  width: 258px;
  height: 258px;
  object-fit: cover;
  transition: all 0.5s linear;
`;
const PrivewProductWrap = styled.div`
  transition: all 1s linear;
  border-radius: 15px;
  width: 258px;
  height: 258px;
  object-fit: cover;
  margin: 0 6.5px;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  justify-content: center;
  border: none;
  font-size: 12px;
  height: 50px;
  border-radius: 60px;
  padding: 25px 10px;
  opacity: 0.5;
  z-index: 2;
  :hover {
    background-color: lightgray;
  }
  i {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const LeftButton = styled(Button)`
  transition: all 0.5s ease-in-out;
  position: absolute;
  left: 10px;
`;

const RightButton = styled(Button)`
  transition: all 0.5s ease-in-out;
  position: absolute;
  right: 10px;
`;

const IndexWrapper = styled.div`
  position: relative;
`;

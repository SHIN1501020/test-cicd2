import styled from 'styled-components';
import spiner from '../assets/image/spiner.gif';

function Loading() {
  return (
    <Wrap>
      <div>데이터를 불러오는 중입니다.</div>
      <div>잠시만 기다려주세요.</div>
      <img src={spiner} alt='로딩 중' />
    </Wrap>
  );
}

export default Loading;

const Wrap = styled.div`
  width: 375px;
  height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    font-size: 15px;
    font-weight: bold;
  }
`;

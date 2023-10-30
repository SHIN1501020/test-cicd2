import styled from 'styled-components';
import error2 from '../assets/image/error2.png';

function Error() {
  return (
    <Wrap>
      <img src={error2}></img>
      <h2>일시적인 오류입니다.</h2>
      <div>새로 고침을 눌러 다시 접속해주세요.</div>
    </Wrap>
  );
}

export default Error;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  img {
    width: 100px;
    height: 100px;
    background-color: white;
  }
`;

import styled from 'styled-components';

type Props = {};

function NPricetItem({}: Props) {
  return (
    <Wrap>
      <NPriceItem>
        <div className='time'>오늘 오전 07 : 30</div>
        <NPriceContent style={{ display: 'flex', flexDirection: 'row' }}>
          <NPriceimg></NPriceimg>
          <NPriceInfo>
            <div className='title'>Apple 정품 2022 아이패드 프로 11 4세대</div>
            <div className='option'>옵션1 스페이스 그레이</div>
            <div className='price'>0,000,000 0,000,000원</div>
          </NPriceInfo>
        </NPriceContent>
      </NPriceItem>
    </Wrap>
  );
}

export default NPricetItem;

const Wrap = styled.div`
  width: 375px;
  height: 126px;
  padding: 18px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  padding-bottom: 0px;
`;

const NPriceItem = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .time {
    font-size: 14px;
    font-weight: bold;
    color: rgba(111, 111, 111, 1);
  }
`;

const NPriceContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 68px;
`;

const NPriceimg = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 7px;
  background-color: rgba(217, 217, 217, 1);
`;

const NPriceInfo = styled.div`
  width: 290px;
  height: 63px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .option {
    font-size: 12px;
    color: rgba(111, 111, 111, 1);
  }
`;

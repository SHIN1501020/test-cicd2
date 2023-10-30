import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Product } from '../../../type';

import Alarmbell from '../../../assets/icon/Alarmbell';

interface Props extends Product {}

function CategoryProduct(props: Props) {
  const navigate = useNavigate();

  // 숫자 천 단위로 데이터 가공 --------------------------------------

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  return (
    <div>
      <Wrap
        onClick={() => {
          navigate(`/detail/${props.productId}`);
        }}
      >
        <CProductImage>
          <img src={props.productImage} className='productImage'></img>
          <BellImage
            style={{ zIndex: '999' }}
            onClick={(e) => {
              console.log('알람클릭');
              e.stopPropagation();
            }}
          >
            <Alarmbell productId={props.productId} isAlertOn={props.isAlertOn} />
          </BellImage>
        </CProductImage>
        <CProductContent>
          <div className='title'>{props.productName}</div>
          {props.discountRate !== 0 ? <div className='originalPrice'>{originalPrice}원</div> : <div></div>}
          <DiscountWrap>
            <div className='currentPrice'>{currentPrice}원</div>
            {props.discountRate !== 0 ? (
              <DiscountRateWrap>
                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'>
                    <path
                      d='M4.256 6.67159C4.65334 7.11401 5.34666 7.11401 5.744 6.67159L9.56398 2.41818C10.1421 1.77442 9.68526 0.75 8.81998 0.75H1.18001C0.31474 0.75 -0.142143 1.77442 0.436019 2.41818L4.256 6.67159Z'
                      fill='#137FFF'
                    />
                  </svg>
                </div>
                <div>{props.discountRate}%</div>
              </DiscountRateWrap>
            ) : (
              <div></div>
            )}
          </DiscountWrap>
        </CProductContent>
      </Wrap>
    </div>
  );
}

export default CategoryProduct;

const Wrap = styled.div`
  width: 166px;
  height: 243px;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
`;

const CProductImage = styled.div`
  width: 166px;
  height: 152.6px;
  border-radius: 20px;
  background-color: rgba(243, 243, 243, 1);
  .productImage {
    width: 100%;
    height: 100%;
  }
`;

const BellImage = styled.div`
  width: 36.49px;
  height: 36.49px;
  z-index: 10;
  position: absolute;
  right: 10px;
  bottom: 100px;
`;

const CProductContent = styled.div`
  width: 156.9px;
  height: 69.66px;
  top: 160.34px;
  padding: 5px;
  .title {
    font-size: 14px;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .originalPrice {
    font-size: 12px;
    color: rgba(181, 181, 181, 1);
    text-decoration: line-through;
  }
  .currentPrice {
    font-size: 16px;
    font-weight: 600;
  }
`;

const DiscountWrap = styled.div`
  width: 153.9px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DiscountRateWrap = styled.div`
  margin-right: 18px;
  width: 42px;
  height: 15px;
  border-radius: 3px;
  background-color: #9ecbff;
  font-size: 10px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  gap: 3px;
  text-align: center;
  justify-content: center;
  color: #137fff;
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

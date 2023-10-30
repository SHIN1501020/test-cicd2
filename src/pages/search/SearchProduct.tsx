import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Product } from '../../type';

import Alarmbell from '../../assets/icon/Alarmbell';

interface Props extends Product {
  key: number;
}

function SearchProduct(props: Props) {
  const navigate = useNavigate();

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  return (
    <Wrap
      onClick={() => {
        navigate(`/detail/${props.productId}`);
      }}
    >
      <SProductImage src={props.productImage} />
      <AlarmWrap
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Alarmbell productId={props.productId} isAlertOn={props.isAlertOn} />
      </AlarmWrap>
      <SProductContent>
        <div className='productName'>{props.productName}</div>
        <div className='originalPrice'>{originalPrice}</div>
        <SProductDiscountWrap>
          <div className='currentPrice'>{currentPrice}원</div>
          <SProductDisount>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'>
                <path
                  d='M4.256 6.67159C4.65334 7.11401 5.34666 7.11401 5.744 6.67159L9.56398 2.41818C10.1421 1.77442 9.68526 0.75 8.81998 0.75H1.18001C0.31474 0.75 -0.142143 1.77442 0.436019 2.41818L4.256 6.67159Z'
                  fill='#137FFF'
                />
              </svg>
            </div>
            <div>{props.discountRate}%</div>
          </SProductDisount>
        </SProductDiscountWrap>
      </SProductContent>
    </Wrap>
  );
}

export default SearchProduct;

const Wrap = styled.div`
  width: 166px;
  min-height: 230px;
  /* border: 1px solid gray; */
  margin-bottom: 15px;
  cursor: pointer;
  position: relative;
`;

const SProductImage = styled.img`
  width: 166px;
  height: 152.6px;
  border-radius: 20px;
  background-color: rgba(243, 243, 243, 1);
`;

const SProductContent = styled.div`
  width: 163.9px;
  height: 69.66px;
  top: 160.34px;
  padding: 5px;
  .productName {
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
    font-weight: 500;
  }
  .currentPrice {
    font-size: 16px;
    font-weight: 600;
  }
`;

const SProductDisount = styled.div`
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

const SProductDiscountWrap = styled.div`
  width: 153.9px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AlarmWrap = styled.div`
  position: absolute;
  top: 0px;
  right: 3px;
`;

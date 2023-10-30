import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { Product } from '../../../type';
import { toggleAlarm } from '../../../api/alarm';

import Alarmbell from '../../../assets/icon/Alarmbell';
import getParametersForUnsplash from '../../../optimization/imgcdn';

interface Props extends Product {
  index: number;
}

function ToptenProduct(props: Props) {
  const navigate = useNavigate();

  // 상품 가격 천 단위 콤마 생성하기 -------------------------------

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  // 알람 설정하기 ------------------------------------------------

  const alarmMutation = useMutation(toggleAlarm, {
    onSuccess: () => {
      console.log('alarm 완료');
    },
    onError: () => {
      console.log('alarm 실패');
    },
  });

  return (
    <Wrap
      onClick={() => {
        navigate(`/detail/${props.productId}`);
      }}
    >
      <ProductImageWrap />
      <BellImage
        style={{ zIndex: '999' }}
        onClick={(e) => {
          console.log('알람클릭');
          e.stopPropagation();
          alarmMutation.mutate(props.productId);
        }}
      >
        <Alarmbell productId={props.productId} isAlertOn={props.isAlertOn} />
      </BellImage>
      <div className='rank'>{props.index + 1}</div>
      <Content>
        <div>
          <span className='discountRate'>{props.discountRate}%</span>
          <span className='price'>{currentPrice}원</span>
          <span className='originalPrice'>{originalPrice}원</span>
        </div>
        <div className='title'>{props.productName}</div>
      </Content>
      <ProductImage src={props.productImage + getParametersForUnsplash(257.997, 257.997, 80, 'jpg')} />
    </Wrap>
  );
}

export default ToptenProduct;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(243, 243, 243, 1);
  border-radius: 15px;
  position: relative;
  .rank {
    font-size: 53.19px;
    color: black;
    line-height: 58, 51px;
    position: absolute;
    left: 16px;
    top: 0px;
  }
  z-index: 10;
`;

const ProductImageWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  background: linear-gradient(
    180.08deg,
    rgba(255, 255, 255, 0) 34.86%,
    rgba(148, 148, 148, 0.04) 53.24%,
    rgba(139, 139, 139, 0.17) 65.15%,
    rgba(120, 120, 120, 0.33) 71.61%,
    rgba(107, 107, 107, 0.62) 80.8%,
    #4d4d4d 100.2%
  );
  border-radius: 15px;
`;

const BellImage = styled.div`
  width: 39.19px;
  height: 39.19px;
  z-index: 10;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Content = styled.div`
  width: 250.09px;
  height: 71.97px;
  position: absolute;
  bottom: -3px;
  left: 14px;
  color: rgba(255, 255, 255, 1);
  div {
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 10px;
  }

  .discountRate {
    font-size: 20.99px;
    font-weight: bold;
  }
  .price {
    font-size: 19.24px;
    font-weight: bold;
    margin-left: 5px;
  }
  .originalPrice {
    font-size: 12.24px;
    font-weight: bold;
    margin-left: 7px;
    text-decoration: line-through;
  }
  .title {
    width: 240px;
    font-size: 13.99px;
    font-weight: 500;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  z-index: -1;
  position: absolute;
  top: 0px;
`;

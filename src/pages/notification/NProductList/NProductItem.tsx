import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Product } from '../../../type';

import { toggleAlarm } from '../../../api/alarm';

interface Props extends Product {}

export default function NProductItem(props: Props) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // 알림상품 제거하기 ------------------------------------------

  const alarmMutation = useMutation(toggleAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries('alarmProducts');
      toast.success('알림 상품 제거 완료.');
    },
    onError: () => {
      console.log('alarm 상품 제거 실패');
    },
  });

  const handleAlarmButton = () => {
    alarmMutation.mutate(props.productId);
  };

  // 상품가격 천 단위 콤마 생성하기 ----------------------------

  const originalPrice = props.originalPrice.toLocaleString();
  const currentPrice = props.currentPrice.toLocaleString();

  return (
    <div>
      <Wrap
        onClick={() => {
          navigate(`/detail/${props.productId}`);
        }}
      >
        <NProductContent>
          <NProductImage src={props.productImage} />
          <NProductInfo>
            <div className='productName'>{props.productName}</div>
            <div className='originalPrice'> {originalPrice}원</div>
            <DiscountWrap>
              <div className='currentPrice'> {currentPrice}원</div>
              <DiscountContent>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'>
                  <path
                    d='M4.256 6.17159C4.65334 6.61401 5.34666 6.61401 5.744 6.17159L9.56398 1.91818C10.1421 1.27442 9.68526 0.25 8.81998 0.25H1.18001C0.31474 0.25 -0.142143 1.27442 0.436019 1.91818L4.256 6.17159Z'
                    fill='#137FFF'
                  />
                </svg>
                <div className='discountRate'>{props.discountRate}%</div>
              </DiscountContent>
            </DiscountWrap>
          </NProductInfo>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleAlarmButton();
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='23' height='24' viewBox='0 0 23 24' fill='none'>
              <circle cx='11.5' cy='11.6847' r='11.5' fill='#00ABF9' />
              <path
                d='M7.73529 14.0082L7.0377 13.5226L7.0377 13.5226L7.73529 14.0082ZM8.34578 12.2364L7.49578 12.2268V12.2364H8.34578ZM8.35722 11.2168L9.20722 11.2264V11.2168H8.35722ZM15.2647 14.2435L15.9716 13.7716L15.9716 13.7716L15.2647 14.2435ZM14.6787 12.2364L13.8287 12.2263V12.2364H14.6787ZM14.6902 11.2674L15.5402 11.2774V11.2674H14.6902ZM10.7798 15.0953C10.4124 14.8031 9.8777 14.8641 9.58551 15.2315C9.29331 15.5989 9.3543 16.1337 9.72172 16.4258L10.7798 15.0953ZM13.2794 16.4258C13.6468 16.1337 13.7078 15.5989 13.4156 15.2315C13.1234 14.8641 12.5887 14.8031 12.2212 15.0953L13.2794 16.4258ZM6.70546 8.57229C6.53867 9.01111 6.75918 9.50205 7.198 9.66884C7.63681 9.83563 8.12775 9.61511 8.29454 9.1763L6.70546 8.57229ZM9.32801 7.92374C9.73618 7.69184 9.87907 7.17297 9.64717 6.7648C9.41527 6.35664 8.8964 6.21375 8.48823 6.44564L9.32801 7.92374ZM14.5099 6.45484C14.1043 6.2185 13.5839 6.35571 13.3475 6.76132C13.1112 7.16693 13.2484 7.68733 13.654 7.92367L14.5099 6.45484ZM14.7024 9.16353C14.8647 9.60403 15.3533 9.82958 15.7938 9.6673C16.2343 9.50503 16.4599 9.01638 16.2976 8.57588L14.7024 9.16353ZM8.43289 14.4939C8.76105 14.0225 9.19578 13.1825 9.19578 12.2364H7.49578C7.49578 12.6975 7.26423 13.1972 7.0377 13.5226L8.43289 14.4939ZM9.19573 12.2459L9.20717 11.2264L7.50727 11.2073L7.49583 12.2268L9.19573 12.2459ZM15.9716 13.7716C15.8992 13.663 15.7824 13.421 15.6835 13.1033C15.5859 12.7901 15.5287 12.4771 15.5287 12.2364H13.8287C13.8287 12.7042 13.9315 13.1954 14.0604 13.609C14.1879 14.0182 14.3642 14.4255 14.5578 14.7155L15.9716 13.7716ZM15.5287 12.2464L15.5401 11.2774L13.8402 11.2573L13.8288 12.2263L15.5287 12.2464ZM15.5402 11.2674C15.5402 8.94709 13.7998 6.93702 11.5005 6.93702V8.63702C12.7244 8.63702 13.8402 9.74335 13.8402 11.2674H15.5402ZM15.0124 15.2534C15.0404 15.2534 15.1189 15.2543 15.1816 15.252C15.2328 15.2501 15.3788 15.2448 15.534 15.1908C15.7048 15.1314 16.081 14.932 16.144 14.4516C16.1898 14.102 16.0196 13.8435 15.9716 13.7716L14.5578 14.7155C14.5491 14.7025 14.5214 14.6597 14.4967 14.5921C14.4725 14.526 14.4366 14.3967 14.4584 14.2306C14.4826 14.0458 14.5698 13.8813 14.6942 13.7603C14.8048 13.6528 14.9177 13.6053 14.9757 13.5851C15.0778 13.5496 15.1514 13.552 15.119 13.5532C15.0981 13.5539 15.082 13.5534 15.0124 13.5534V15.2534ZM9.20722 11.2168C9.20722 9.72073 10.3022 8.63702 11.5005 8.63702V6.93702C9.22682 6.93702 7.50722 8.92447 7.50722 11.2168H9.20722ZM7.98917 13.5534C8.20198 13.5534 8.35617 13.6625 8.44142 13.7853C8.53972 13.9268 8.62261 14.2214 8.43289 14.4939L7.0377 13.5226C6.72846 13.9668 6.83948 14.4589 7.0452 14.7551C7.23787 15.0325 7.57876 15.2534 7.98917 15.2534V13.5534ZM15.0124 13.5534H7.98917V15.2534H15.0124V13.5534ZM11.5005 15.3347C11.2095 15.3347 10.9587 15.2376 10.7798 15.0953L9.72172 16.4258C10.2061 16.8111 10.8313 17.0347 11.5005 17.0347V15.3347ZM12.2212 15.0953C12.0424 15.2376 11.7915 15.3347 11.5005 15.3347V17.0347C12.1698 17.0347 12.7949 16.8111 13.2794 16.4258L12.2212 15.0953ZM8.29454 9.1763C8.50554 8.62117 8.87409 8.18164 9.32801 7.92374L8.48823 6.44564C7.65566 6.91867 7.04204 7.68678 6.70546 8.57229L8.29454 9.1763ZM13.654 7.92367C14.1355 8.20422 14.5093 8.63937 14.7024 9.16353L16.2976 8.57588C15.963 7.66764 15.3202 6.92699 14.5099 6.45484L13.654 7.92367Z'
                fill='white'
              />
            </svg>
          </div>
        </NProductContent>
      </Wrap>
    </div>
  );
}

const Wrap = styled.div`
  width: 375px;
  height: 90px;
  gap: 6px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const NProductContent = styled.div`
  width: 360px;
  height: 64px;
  gap: 6px;
  display: flex;
  flex-direction: row;
`;

const NProductImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 7px;
  background-color: rgba(217, 217, 217, 1);
`;

const NProductInfo = styled.div`
  width: 256px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .productName {
    font-size: 13px;
    font-weight: bold;
  }
  .originalPrice {
    font-size: 12px;
    color: rgba(111, 111, 111, 1);
    text-decoration: line-through;
  }
  .currentPrice {
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
`;

const DiscountWrap = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const DiscountContent = styled.div`
  width: 30px;
  height: 15px;
  border-radius: 3px;
  background: #9ecbff;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  justify-content: center;
  font-size: 8px;
  font-weight: 500;
  color: #137fff;
`;

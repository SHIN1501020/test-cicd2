import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getAlarmProducts } from '../../../api/alarm';

import { Product } from '../../../type';

import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import NProductItem from './NProductItem';

export default function NProductList() {
  // 알림설정한 상품 불러오기 --------------------------------------------------------

  const { status, data } = useQuery('alarmProducts', getAlarmProducts);
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 화면 ----------------------------------------------------------------------

  return (
    <Wrap>
      {data.map((item: Product, index: number) => {
        return <NProductItem key={index} {...item} />;
      })}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 380px;
  max-height: 683px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

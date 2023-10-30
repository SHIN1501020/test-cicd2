import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getProducts } from '../../../../api/product';

import CategoryProduct from '../CategoryProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';

interface Props {
  isSoldout: boolean;
}

function CategoryOffProductList(props: Props) {
  // 리액트 쿼리로 데이터 불러오기 --------------------------------------

  const { status, data } = useQuery('products', () => getProducts(props.isSoldout));

  // 데이터 로딩 중 관리 -------------------------

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const eightProducts = [];

  for (let i = 0; i < 8; i++) {
    eightProducts.push(data[Math.floor(Math.random() * 300)]);
  }

  console.log(eightProducts);

  return (
    <Wrap>
      {eightProducts.map((productItem, index) => (
        <CategoryProduct key={index} {...productItem} />
      ))}
      <BusinessInfo>
        <h5>사업자 정보</h5>
        <div>대표자: 이준석</div>
        <div>전화번호: 010-3599-6345</div>
        <div>업체명: 아담 인터네셔널</div>
        <div>사업자 등록번호: 394-27-00969</div>
        <div>서울특별시 경희대로 26 삼의원 창업센터 311호</div>
      </BusinessInfo>
    </Wrap>
  );
}

export default CategoryOffProductList;

const Wrap = styled.div`
  width: 350px;
  height: 750px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  top: 210px;
  padding-bottom: 80px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 375px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.1;
`;

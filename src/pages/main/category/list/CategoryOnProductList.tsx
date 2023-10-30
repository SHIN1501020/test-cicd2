import styled from 'styled-components';
import { useQueries } from 'react-query';
import { useEffect } from 'react';

import { getCategory } from '../../../../api/product';
import { getCategoryFilter } from '../../../../api/product';

import CategoryOnProduct from '../CategoryProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';

interface Props {
  categoryId: number;
  filterName: string;
  isFilter: boolean;
  isSoldout: boolean;
}

function CategoryOnProductList(props: Props) {
  // 카테고리 이름 -----------------------------------------------------------------------

  const categoryNameList = ['iPad', 'iPad', 'MacBook', 'Mac', 'AirPods', 'iPhone', 'AppleWatch'];

  // 리액트 쿼리로 데이터 불러오기 --------------------------------------

  const result = useQueries([
    { queryKey: ['categoryProduct'], queryFn: () => getCategory(categoryNameList[props.categoryId], props.isSoldout) },
    {
      queryKey: ['filterProduct'],
      queryFn: () => getCategoryFilter(categoryNameList[props.categoryId], props.filterName, props.isSoldout),
    },
  ]);

  // 카테고리, 필터가 변경될 때마다 서버로 refetch---------------------------------------------------------

  useEffect(() => {
    result[0].refetch();
    result[1].refetch();
  }, [props.isSoldout]);

  useEffect(() => {
    result[1].refetch();
    result[0].refetch();
  }, [props.categoryId, props.filterName]);

  // 데이터 로딩 중 & 에러 관리 ----------------------------------------------------------------------------------

  if (result[0].status === 'loading') {
    return <Loading />;
  }
  if (result[0].status === 'error') {
    return <Error />;
  }
  if (result[1].status === 'loading') {
    return <Loading />;
  }
  if (result[1].status === 'error') {
    return <Error />;
  }

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const categoryProducts = [...result[0].data].slice(0, 8);
  const filterProducts = [...result[1].data].slice(0, 8);

  // console.log(list.slice(0, 10));

  return (
    <Wrap>
      {props.isFilter
        ? filterProducts.map((productItem, index) => <CategoryOnProduct key={index} {...productItem} />)
        : categoryProducts.map((productItem, index) => <CategoryOnProduct key={index} {...productItem} />)}
    </Wrap>
  );
}

export default CategoryOnProductList;

const Wrap = styled.div`
  width: 346px;
  height: 700px;
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

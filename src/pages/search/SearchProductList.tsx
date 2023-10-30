import { useQueries } from 'react-query';
import SearchProduct from './SearchProduct';
import styled from 'styled-components';
import { getSearch, getFilteredSearch } from '../../api/product';
import { useEffect } from 'react';
import { Product } from '../../type';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

interface Props {
  searchWord: string | undefined;
  isSoldout: boolean;
  isFilter: boolean;
  filterName: string;
  filterButton: boolean[];
}

function SearchProductList(props: Props) {
  // 검색한 상품과 검색한 상품을 필터링한 데이터 불러오기 -----------------------------------------------------------------

  const result = useQueries([
    { queryKey: ['searchProduct', props.searchWord], queryFn: () => getSearch(props.searchWord, props.isSoldout) },
    {
      queryKey: ['FilteredSearchProduct'],
      queryFn: () => getFilteredSearch(props.filterName, props.searchWord, props.isSoldout),
      enabled: !!props.filterButton,
    },
  ]);

  // 필터버튼 클릭할 때마다 리패치 -------------------------------------------------------------------------

  useEffect(() => {
    result[0].refetch();
    result[1].refetch();
  }, [props.filterButton, props.isFilter]);

  // 로딩, 에러 관리 ---------------------------------------------------------

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

  return (
    <div>
      <Wrap>
        {props.isFilter
          ? result[1].data.map((item: Product, index: number) => {
              return <SearchProduct key={index} {...item} />;
            })
          : result[0].data.map((item: Product, index: number) => {
              return <SearchProduct key={index} {...item} />;
            })}
      </Wrap>
    </div>
  );
}

export default SearchProductList;

const Wrap = styled.div`
  width: 346px;
  max-height: 710px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

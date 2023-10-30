import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Params } from '../../type';
import { Filter } from '../../type';

import SearchProductList from './SearchProductList';
import PageFooter from '../../components/footer/PageFooter';
import FilterOption from './FilterOption';

function Search() {
  // params 를 통해 productId 받아오기 -------------------------

  const params: Params = useParams();
  const navigate = useNavigate();

  // 상태 관리 ------------------------------------------------------------------------

  const [searchWord, setSearchWord] = useState<string>(`${params.searchWord}`);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>(``);
  const [filterButton, setFilterButton] = useState<boolean[]>([false, false, false]);
  const [isSoldout, setIsSoldout] = useState<boolean>(false);

  // 필터버튼 클릭할 때마다 리패치 -------------------------------------------------------------------------

  useEffect(() => {
    console.log('서치페이지 렌더링');
  }, []);
  // 필터 리스트 -------------------------------------------

  const filterList: Filter[] = [
    { content: '할인순', value: 'discountRate_desc' },
    { content: '낮은가격순', value: 'price_asc' },
    { content: '높은가격순', value: 'price_desc' },
  ];

  // 검색어 입력 --------------------------------------------------

  const onChangeSearchWord = (e: any) => {
    setSearchWord(e.target.value);
  };

  // 필터 버튼 클릭 ------------------------------------------------------------

  const handleFilterButton = (idx: number, value: string) => {
    setIsFilter(true);
    setFilterName(value);
    setFilterButton(() => {
      const newArr = Array(3).fill(false);
      if (filterButton[idx] === true) {
        newArr[idx] = false;
        setIsFilter(false);
      } else {
        newArr[idx] = true;
      }
      return newArr;
    });
  };

  // 화면 ================================================================

  return (
    <div>
      <form
        onSubmit={(e) => {
          navigate(`/search/${searchWord}`);
          e.preventDefault();
        }}
      >
        <div>
          <Header>
            <SearchInputWrap>
              <SearchInput
                type='text'
                value={searchWord}
                onChange={(e) => {
                  onChangeSearchWord(e);
                }}
              ></SearchInput>
            </SearchInputWrap>
            <button style={{ display: 'none' }} />
          </Header>
          <Filterbar>
            <Options>
              {filterList.map((item, index) => {
                return (
                  <FilterOption key={index} index={index} filterButton={filterButton} handleFilterButton={handleFilterButton} isFilter={isFilter} {...item} />
                );
              })}
              <Soldout
                onClick={() => {
                  setIsSoldout(!isSoldout);
                }}
                $isSoldout={isSoldout}
              >
                품절상품제외
              </Soldout>
            </Options>
          </Filterbar>
          <SearchProductList searchWord={params.searchWord} isSoldout={isSoldout} isFilter={isFilter} filterName={filterName} filterButton={filterButton} />
        </div>
        <PageFooter />
      </form>
    </div>
  );
}

export default Search;

const Header = styled.div`
  width: 375px;
  height: 62px;
  top: 34px;
  padding: 12px, 51px, 12px, 12px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchInputWrap = styled.div`
  width: 288px;
  height: 38px;
  border-radius: 46.21px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 243px;
  height: 38px;
  border: none;
  outline: none;
`;

const Filterbar = styled.div`
  width: 375px;
  height: 31px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(181, 181, 181, 1);
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  height: 12px;
  padding-top: 10px;
  width: 375px;
  height: 13px;
`;

const Soldout = styled.div<{ $isSoldout: boolean }>`
  margin-left: 150px;
  cursor: pointer;
  color: ${(props) => (!props.$isSoldout ? 'rgba(181, 181, 181, 1)' : 'var(--maincolor_dark, #00ABF9)')};
`;

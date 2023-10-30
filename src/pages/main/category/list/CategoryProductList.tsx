import CategoryOffProductList from './CategoryOffProductList';
import CategoryOnProductList from './CategoryOnProductList';
import styled from 'styled-components';

interface Props {
  isOnCategory: boolean;
  categoryId: number;
  filterName: string;
  isFilter: boolean;
  isSoldout: boolean;
}

function CategoryList({ isOnCategory, categoryId, filterName, isFilter, isSoldout }: Props) {
  return (
    <Wrap>
      {isOnCategory ? (
        <CategoryOnProductList categoryId={categoryId} filterName={filterName} isFilter={isFilter} isSoldout={isSoldout} />
      ) : (
        <CategoryOffProductList isSoldout={isSoldout} />
      )}
    </Wrap>
  );
}

export default CategoryList;

const Wrap = styled.div`
  width: 370px;
`;

import styled from 'styled-components';

interface Props {
  children: number;
  isCategorySelected: boolean[];
  handleCategoryButton: any;
  index: number;
  content: any;
}

function CategoryTab(props: Props) {
  return (
    <div>
      <Wrap type='button' onClick={() => props.handleCategoryButton(props.index)} $isCategorySelected={props.isCategorySelected[props.index]}>
        {props.content}
      </Wrap>
    </div>
  );
}

export default CategoryTab;

const Wrap = styled.button<{ $isCategorySelected: boolean }>`
  width: 96px;
  height: 38px;
  border-radius: 32px;
  border: 1px solid rgba(217, 217, 217, 1);
  background-color: ${(props) => (props.$isCategorySelected ? '#0FB4FF' : 'white')};
  color: ${(props) => (props.$isCategorySelected ? 'white' : 'black')};
  font-size: 16px;
  font-weight: 500;
  flex-shrink: 0;
  flex-basis: 96px;
`;

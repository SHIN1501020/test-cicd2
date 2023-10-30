import styled from 'styled-components';

interface Props {
  children: number;
  filterButton: boolean[];
  handleFilterButton: any;
  index: number;
  content: string;
  value: string;
  isFilter: boolean;
}

function FilterOption(props: Props) {
  return (
    <div>
      <Wrap onClick={() => props.handleFilterButton(props.index, props.value)} $filterButton={props.filterButton[props.index]}>
        {props.content}
      </Wrap>
    </div>
  );
}

export default FilterOption;

const Wrap = styled.div<{ $filterButton: boolean }>`
  font-size: 12px;
  color: ${(props) => (!props.$filterButton ? 'rgba(181, 181, 181, 1)' : 'var(--maincolor_dark, #00ABF9)')};
  cursor: pointer;
`;

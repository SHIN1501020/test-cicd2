import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getOptions } from '../../../api/product';

import OptionModalItem from './OptionModalItem';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

interface Props {
  realId: string;
  isOpenOption: boolean;
  productId: number;
  handleOptionButton: any;
}

function OptionModal(props: Props) {
  // 상품옵션 데이터 가져오기 ----------------------------------------------------

  const { status, data } = useQuery('options', () => getOptions(props.realId));

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 해당상품 제외시키기 ---------------------------------------------------------------

  const withoutOptionList = [...data].filter((it) => it.productId !== props.productId);

  // 화면 ===============================================================================

  return (
    <div>
      <Wrap $isOpen={props.isOpenOption}>
        {withoutOptionList.map((item, index) => {
          return <OptionModalItem key={index} {...item} handleOptionButton={props.handleOptionButton} />;
        })}
      </Wrap>
    </div>
  );
}

export default OptionModal;

const Wrap = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 84px;
  right: 39px;
  border: 1px solid #b5b5b5;
  z-index: 10;
  width: 300px;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  height: ${(props) => (props.$isOpen ? 'auto' : '0px')};
  max-height: 250px;
  overflow: scroll;
  transition: all 400ms ease-in-out 0s;
  border-radius: 10px;
`;

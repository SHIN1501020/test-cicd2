import styled from 'styled-components';
import SimilarProduct from './SimilarProduct';
import { useQuery } from 'react-query';
import { getSimilarProducts } from '../../../api/product';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { Product } from '../../../type';
type Props = {
  productId: string;
};

function SimilarProductList(props: Props) {
  const { status, data } = useQuery('similarProducts', () => getSimilarProducts(props.productId));
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }
  console.log(data);
  return (
    <div>
      <Wrap>
        {data.map((item: Product, index: number) => {
          return <SimilarProduct key={index} {...item} />;
        })}
      </Wrap>
    </div>
  );
}

export default SimilarProductList;

const Wrap = styled.div`
  width: 375px;
  height: 185px;
  margin-top: 14px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10%; /* 스크롤바의 길이 */
    height: 5px;
    background: rgba(181, 181, 181, 1);
    border-radius: 10px;
  }
`;

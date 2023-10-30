import styled from 'styled-components';
import { LikeProps } from '../../type/type';
import { ColorHeartIcon, LineHeartIcon } from '../../assets/icon/icon';
import { HeartProps } from '../../type/type';

const Heart: React.FC<HeartProps> = ({ like, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: '-4px',
        background: 'none',
        border: 'none',
        outline: 'none',
      }}
    >
      {like ? <ColorHeartIcon /> : <LineHeartIcon />}
    </button>
  );
};

const Like: React.FC<LikeProps> = ({ isLiked, magazineId, likeCount, handleLikeClick, index }) => {
  return (
    <div>
      <LikeFlex>
        <Heart like={isLiked} onClick={(event) => handleLikeClick(event, magazineId, index)} />
        <div>{likeCount}</div>
      </LikeFlex>
    </div>
  );
};

export default Like;

const LikeFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
`;

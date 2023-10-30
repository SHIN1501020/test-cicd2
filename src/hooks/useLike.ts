import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postMagazineLike } from '../api/magazine';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useLike = (initialLike: boolean, initialCount: number) => {
  const [like, setLike] = useState(initialLike);
  const [likeCount, setLikeCount] = useState(initialCount);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const magazineLike = useMutation(postMagazineLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('좋아요 error 발생', error);
    },
  });

  // 좋아요 버튼 클릭 시 실행, 좋아요 상태와 수를 업데이트
  const handleLikeClick = (event: any, magazineId: string | number, index: number, setMagazines?: any) => {
    event.stopPropagation();
    const accessToken = Cookies.get('Authorization');
    if (!accessToken) {
      toast.error('로그인 후 이용하세요.', {
        onClose: () => navigate('/login'),
      });
      return;
    }
    if (setMagazines) {
      setMagazines((prevMagazines: any) => {
        const updatedMagazines = [...prevMagazines];
        updatedMagazines[index].isLiked = !updatedMagazines[index].isLiked;
        updatedMagazines[index].LikeMagazine += updatedMagazines[index].isLiked ? 1 : -1;
        return updatedMagazines;
      });
    }
    setLike(!like);
    setLikeCount(like ? likeCount - 1 : likeCount + 1);
    magazineLike.mutate({ id: magazineId });
  };

  return { like, likeCount, handleLikeClick };
};

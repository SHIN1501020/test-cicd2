import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { getUserinfo, postUserinfo } from '../../../api/mypage';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DeleteIdWithKakao } from '../../../api/login';
import PageFooter from '../../../components/footer/PageFooter';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { toast } from 'react-toastify';

export default function EditMypage() {
  // 리액트 쿼리로 유저정보 가져오기 -----------------------------------------

  const { data, status } = useQuery('userInfo', getUserinfo);
  const queryClient = useQueryClient();

  // 상태 관리 -------------------------------------------------------------

  const [name, setName] = useState<string | undefined>(data.nickname);
  const [imageFile, setImageFile]: any = useState();
  const [imageSrc, setImageSrc]: any = useState(data.image);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }
  console.log(data);

  // 네비게이트 ---------------------------------------------------------------

  const navigate = useNavigate();

  // 프로필 이미지 수정 --------------------------------------------------------

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
      };
    }
  };

  // 프로필 이름 수정 -----------------------------------------------------------

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const userInfoMutation = useMutation(postUserinfo, {
    onSuccess: () => {
      console.log('mutate 완료');
    },
    onError: () => {
      console.log('mutate 실패');
    },
  });

  // 회원 탈퇴
  const deleteId = useMutation(DeleteIdWithKakao, {
    onSuccess: () => {
      queryClient.invalidateQueries('KakaoId');
    },
    onError: (error) => {
      console.log('error 발생', error);
    },
  });

  const onDeleteButtonHandler = () => {
    deleteId.mutate();
    alert('탈퇴되었습니다.');
    navigate('/');
  };

  return (
    <div>
      <Header>
        <h2>프로필 수정</h2>
        <CompleteButton
          onClick={() => {
            userInfoMutation.mutate(
              { name, imageFile },
              {
                onSuccess: () => {
                  toast.success('수정 완료!');
                  navigate('/mypage');
                },
                onError: (error) => {
                  console.error('마이페이지 수정 에러', error);
                },
              }
            );
          }}
        >
          완료
        </CompleteButton>
      </Header>
      <Wrap>
        <Profile>
          <ProfileImage src={imageSrc} />
          <ImageInput onChange={(e) => onUpload(e)} multiple type='file' accept='image/*' id='profileimage'></ImageInput>
          <EditImageLabel htmlFor='profileimage'>수정</EditImageLabel>
          <EditName onChange={onChangeName} value={name}></EditName>
          <Withdrawal onClick={onDeleteButtonHandler}>회원탈퇴</Withdrawal>
        </Profile>
      </Wrap>
      <PageFooter />
    </div>
  );
}

const Header = styled.div`
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CompleteButton = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  right: 12px;
`;
const Wrap = styled.div`
  height: 600px;
`;

const Profile = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: rgba(217, 217, 217, 1);
  object-fit: cover;
`;

const EditImageLabel = styled.label`
  position: absolute;
  opacity: 0;
  width: 110px;
  height: 110px;
  border-radius: 60px;
  top: 176px;
`;

const EditName = styled.input`
  width: 155px;
  height: 40px;
  border-radius: 7px;
  margin-top: 60px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  color: black;
`;

const Withdrawal = styled.div`
  color: var(--gray02, #b5b5b5);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 17.6px */
  text-decoration-line: underline;
  position: absolute;
  bottom: 300px;
`;

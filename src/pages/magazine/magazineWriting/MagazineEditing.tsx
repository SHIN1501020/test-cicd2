import React, { useState, useEffect, useRef } from 'react';
import { FlexBox, Button, ContentBox, Title, Content, DirectionCol, PhotoAdd, PhotoDiv, StyledImage } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { putMagazine } from '../../../api/magazine';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const MagazineEditing: React.FC = () => {
  const location = useLocation();
  const magazineData = location.state.props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(magazineData.title);
  const [newContent, setNewContent] = useState(magazineData.content);
  const [newMainImage, setNewImage] = useState(magazineData.mainImage);
  const [previewImage, setPreviewImage] = useState<string>(magazineData.mainImage);
  const queryClient = useQueryClient();

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value;
    setNewTitle(newTitle);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newContent = e.target.value;
    setNewContent(newContent);
  };

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newMainImage = e.target.files?.[0];
    setNewImage(newMainImage);
    if (newMainImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(newMainImage);
    }
  };

  // 데이터 변경하기
  const changePost = useMutation(putMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('매거진 수정 에러', error);
    },
  });

  const onSubmitButtonHandler = (id: any, newTitle: string, newContent: string, newMainImage: File) => {
    changePost.mutate(
      {
        id,
        newTitle,
        newContent,
        newMainImage,
      },
      {
        onSuccess: () => {
          toast.success('수정되었습니다.');
          navigate('/magazine');
        },
        onError: (error) => {
          console.error('매거진 추가 에러', error);
        },
      }
    );
  };

  const adjustHeight = () => {
    const targetTextarea = contentRef.current;
    if (targetTextarea) {
      targetTextarea.style.height = 'auto';
      if (targetTextarea.scrollHeight > targetTextarea.clientHeight) {
        targetTextarea.style.height = targetTextarea.scrollHeight + 'px';
      } else {
        targetTextarea.style.height = window.innerHeight + 'px';
      }
    }
  };

  // 내용이 변경될 때마다 높이 조정
  useEffect(() => {
    adjustHeight();
  }, [newContent]);

  // 컴포넌트가 마운트 될 때 높이 조정
  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <>
      <FlexBox>
        <Button onClick={() => navigate('/magazine')}></Button>
        <Button onClick={() => onSubmitButtonHandler(id, newTitle, newContent, newMainImage)}>수정</Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <PhotoDiv>
            <PhotoAdd></PhotoAdd>
          </PhotoDiv>
          <Title value={newTitle} onChange={onTitleChangeHandler} />
          <StyledImage src={previewImage} alt='매거진 이미지' />
          <input type='file' accept='image/*' onChange={onImageChangeHandler} />
          <textarea style={{ display: 'none' }} />
          <Content
            value={newContent}
            onChange={onContentChangeHandler}
            ref={contentRef}
            style={{ overflowY: 'auto', minHeight: '50em', boxSizing: 'border-box' }}
          />
        </DirectionCol>
      </ContentBox>
    </>
  );
};

export default MagazineEditing;

import React, { useState, useRef, useEffect } from 'react';
import { FlexBox, Button, ContentBox, Title, Content, DirectionCol, PhotoAdd, PhotoDiv } from './styles';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { postMagazine } from '../../../api/magazine';
import PageFooter from '../../../components/footer/PageFooter';
import { BackIcon, AddImageIcon } from '../../../assets/icon/icon';

const MagazineWriting: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // 데이터 추가하기
  const [title, setTitle] = useState<any>('');
  const [content, setContent] = useState<any>('');
  const [image, setImage] = useState<any>(null);

  const addPosts = useMutation(postMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('changePosts 에러', error);
    },
  });

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const imageFile = e.target.files?.[0];
    setImage(imageFile);
  };

  const onSubmitButtonHandler = (title: any, content: any, image: any) => {
    addPosts.mutate(
      { title, content, image },
      {
        onSuccess: () => {
          alert('추가 완료');
          navigate('/magazine');
        },
        onError: (error) => {
          console.error('매거진 추가 에러', error);
        },
      }
    );
  };

  // textarea 높이 조정(제목)
  const adjustTitleHeight = () => {
    const targetTextarea = titleRef.current;
    if (targetTextarea) {
      targetTextarea.style.height = 'auto';
      targetTextarea.style.height = targetTextarea.scrollHeight + 'px';
    }
  };

  // textarea 높이 조정(내용)
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

  // 컴포넌트가 마운트 될 때 길이 조정
  useEffect(() => {
    adjustHeight();
    adjustTitleHeight();
  }, []);

  // title, content 값이 변경될 때 길이 조정
  useEffect(() => {
    adjustTitleHeight();
    adjustHeight();
  }, [title, content]);

  return (
    <>
      <FlexBox>
        <Button onClick={() => navigate('/magazine')}>
          <BackIcon />
        </Button>
        <Button onClick={() => onSubmitButtonHandler(title, content, image)}>등록</Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <PhotoDiv>
            <PhotoAdd>
              <label>
                <input style={{ display: 'none' }} onChange={onImageChangeHandler} type='file' accept='image/*' />
                <AddImageIcon />
              </label>
            </PhotoAdd>
          </PhotoDiv>
          <Title placeholder='제목' onChange={onTitleChangeHandler} value={title} ref={titleRef} />
          <input placeholder='이미지' onChange={onImageChangeHandler} type='file' accept='image/*' style={{ display: 'none' }} />
          <Content
            placeholder='내용을 입력하세요'
            onChange={onContentChangeHandler}
            value={content}
            ref={contentRef}
            rows={100}
            style={{ overflowY: 'auto', minHeight: '50em', boxSizing: 'border-box' }}
          />
        </DirectionCol>
      </ContentBox>
      <PageFooter />
    </>
  );
};

export default MagazineWriting;

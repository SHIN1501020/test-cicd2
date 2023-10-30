import styled from 'styled-components';

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 0px 22px 0px;
`;

export const Button = styled.button`
  border: none;
  font-size: 20px;
  font-weight: 600;
  width: 80px;
  height: 24px;
  background-color: transparent;
  padding: 22px 18px;
`;

export const ContentBox = styled.div`
  width: 335px;
  height: 527px;
  margin: 0px auto 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.input`
  font-size: 26px;
  line-height: 26px;
  font-weight: 500;
  color: #b1b1b1;
  margin-top: 25px;
  padding-bottom: 13px;
  height: auto;
  border: none;
  border-bottom: 1px solid #b1b1b1;

  &:focus {
    outline: none;
  }
`;

export const Content = styled.textarea`
  font-size: 18px;
  font-weight: 500;
  color: #b1b1b1;
  margin-top: 13px;
  border: none;
  line-height: 1.5;

  &:focus {
    outline: none;
  }
`;

export const DirectionCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PhotoAdd = styled.button`
  margin-top: 13px;
  background-color: transparent;
  border: none;
`;

export const PhotoDiv = styled.div`
  height: 50px;
  border-top: 1px solid #b1b1b1;
  border-bottom: 1px solid #b1b1b1;
`;

export const StyledImage = styled.img`
  max-width: 375px;
`;

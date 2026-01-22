import React from "react";
import { useNavigate } from "react-router-dom";

import {
  NotFoundContainer,
  ContentBox,
  ErrorCode,
  Title,
  Description,
  ButtonGroup,
  BackButton,
  HomeButton,
} from "./styles";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <NotFoundContainer>
      <ContentBox>
        <ErrorCode>404</ErrorCode>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Description>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Description>

        <ButtonGroup>
          <BackButton onClick={handleBack}>
            이전 페이지
          </BackButton>

          <HomeButton onClick={() => navigate("/")}>
            메인 페이지
          </HomeButton>
        </ButtonGroup>
      </ContentBox>
    </NotFoundContainer>
  );
};

export default NotFound;

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList/ReviewList";
import { UserPageContainer } from "./styles";

const CaptainReviewPage = () => {
  const { captainNo } = useParams();
  const location = useLocation();

  // CaptainsPage에서 navigate state로 넘긴 nickname 받기
  const captainNickname = location?.state?.nickname ?? "";

  return (
    <UserPageContainer>
      <ReviewList
        mode="CAPTAIN"
        captainNo={Number(captainNo)}
        captainNickname={captainNickname}
      />
    </UserPageContainer>
  );
};

export default CaptainReviewPage;

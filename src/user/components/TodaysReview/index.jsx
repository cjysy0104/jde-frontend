import React, { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard";
import { reviewApi } from "../../../utils/reviewApi";
import {
  ReviewSectionContainer,
  ReviewContent,
  SectionTitle,
  ReviewGrid,
  MoreButton,
} from "./styles";
import { useNavigate } from "react-router";

const TodaysReview = ({ keywordNo, query }) => {
  const SIZE = 3;

  const [reviews, setReviews] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [cursorLikeCount, setCursorLikeCount] = useState(null);

  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const fetchBestReviews = async ({ append = false, nextCursor = null, nextCursorLikeCount = null } = {}) => {
    if (loading || !hasNext) return;

    try {
      setLoading(true);

      const response = await reviewApi.getBestReviewList({
        cursor: nextCursor,
        cursorLikeCount: nextCursorLikeCount,
        keywordNo,
        query,
      });

      const list = response.data;
      console.log(response.data);

      const next = list.length > SIZE;
      setHasNext(next);

      const viewList = next ? list.slice(0, SIZE) : list;

      setReviews((prev) => (append ? [...prev, ...viewList] : viewList));

      if (viewList.length > 0) {
        const last = viewList[viewList.length - 1];
        setCursor(last.reviewNo);
        setCursorLikeCount(last.recentLikeCount);
      }
    } catch (e) {
      console.log("베스트 리뷰 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setReviews([]);
    setCursor(null);
    setCursorLikeCount(null);
    setHasNext(true);

    fetchBestReviews({ append: false, nextCursor: null, nextCursorLikeCount: null });
  }, [keywordNo, query]);

  const handleMore = () => {
    fetchBestReviews({
      append: true,
      nextCursor: cursor,
      nextCursorLikeCount: cursorLikeCount,
    });
  };

  return (
    <ReviewSectionContainer>
      <ReviewContent>
        <SectionTitle>오늘의 리뷰</SectionTitle>

        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard 
              key={review.reviewNo} 
              review={review}
              />
          ))}
        </ReviewGrid>

        {hasNext && (
          <MoreButton onClick={handleMore} disabled={loading}>
            {loading ? "로딩 중..." : "더보기"} <span>+</span>
          </MoreButton>
        )}
      </ReviewContent>
    </ReviewSectionContainer>
  );
};

export default TodaysReview;

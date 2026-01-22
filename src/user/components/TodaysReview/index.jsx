import React, { useEffect, useState } from 'react';
import ReviewCard from '../ReviewCard';
import {
  ReviewSectionContainer,
  ReviewContent,
  SectionTitle,
  ReviewGrid,
  MoreButton,
} from './styles';
import { reviewApi } from '../../../utils/api';


const TodaysReview = () => {

  const [reviews, setReviews] = useState([]);

  const [cursor, setCursor] = useState();
  const [cursorLikeCount, setCursorLikeCount] = useState();
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const fetchBestReviews = async ({ append = false } = {}) => {
    if(loading || !hasNext) return;

    try {
      setLoading(true);

      const response = await reviewApi.getBestReviewList({
        cursor, 
        cursorLikeCount
      });

      console.log(response);
      const list = response.data;

      const hasNextData = list.length > 3;
      setHasNext(hasNextData);

      const viewList = hasNextData? list.slice(0, 3) : list;


      setReviews((prev) => (append ? [...prev, ...viewList] : viewList));

      if (viewList.length > 0) {
        const last = viewList[viewList.length - 1];
        setCursor(last.reviewNo);
        setCursorLikeCount(last.recentLikeCount);
      }

    } catch (error) {
      console.log("베스트 리뷰 조회 실패", error)
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchBestReviews();
  }, []);

  const handleMore = () => {
    fetchBestReviews({append: true});
  };
  
  return (
    <ReviewSectionContainer>
      <ReviewContent>
        <SectionTitle>오늘의 리뷰</SectionTitle>
        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.reviewNo} review={review} />
          ))}
        </ReviewGrid>
        <MoreButton onClick={handleMore} disabled={loading}>
          더보기
          <span>+</span>
        </MoreButton>
      </ReviewContent>
    </ReviewSectionContainer>
  );
};

export default TodaysReview;

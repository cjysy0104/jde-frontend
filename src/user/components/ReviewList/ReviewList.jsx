// ReviewList.jsx
import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import {
  Container,
  SearchSection,
  SearchBar,
  SearchInput,
  SearchIcon,
  SortDropdown,
  ReviewGrid,
  FloatingButton,
  PlusIcon
} from './ReviewList.styled';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState('최신순');

  // API 호출 예시 (실제 사용 시 주석 해제)
  useEffect(() => {
    // fetchReviews();
    
    // 임시 데이터
    setReviews([
      {
        reviewNo: 11,
        thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        restaurantName: "부산어묵집",
        nickname: "seoyeon",
        content: "국물이 조금 짰어요.",
        rating: 2.0,
        updateDate: "2026-01-13",
        viewCount: 30,
        likeCount: 0,
        commentCount: 1,
        isLiked: "N",
        isMarked: "N",
        keywords: [
          {
            keywordNo: 4,
            keywordName: "가성비"
          }
        ]
      },
      {
        reviewNo: 12,
        thumbnailUrl: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop",
        restaurantName: "건강한 한식당",
        nickname: "foodlover",
        content: "비빔밥 정말 맛있어요! 야채도 신선하고 양도 푸짐해요.",
        rating: 4.5,
        updateDate: "2026-01-14",
        viewCount: 85,
        likeCount: 12,
        commentCount: 5,
        isLiked: "Y",
        isMarked: "N",
        keywords: [
          {
            keywordNo: 1,
            keywordName: "맛있어요"
          },
          {
            keywordNo: 2,
            keywordName: "신선해요"
          }
        ]
      }
    ]);
  }, []);

  // 실제 API 호출 함수
  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews'); // 실제 API 엔드포인트로 변경
      const result = await response.json();
      
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error('리뷰 조회 실패:', error);
    }
  };

  const handleLike = async (reviewNo) => {
    try {
      // API 호출
      // await fetch(`/api/reviews/${reviewNo}/like`, { method: 'POST' });
      
      // 로컬 상태 업데이트
      setReviews(reviews.map(review => 
        review.reviewNo === reviewNo 
          ? { 
              ...review, 
              isLiked: review.isLiked === 'Y' ? 'N' : 'Y',
              likeCount: review.isLiked === 'Y' ? review.likeCount - 1 : review.likeCount + 1
            }
          : review
      ));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  const handleBookmark = async (reviewNo) => {
    try {
      // API 호출
      // await fetch(`/api/reviews/${reviewNo}/bookmark`, { method: 'POST' });
      
      // 로컬 상태 업데이트
      setReviews(reviews.map(review => 
        review.reviewNo === reviewNo 
          ? { ...review, isMarked: review.isMarked === 'Y' ? 'N' : 'Y' }
          : review
      ));
    } catch (error) {
      console.error('북마크 처리 실패:', error);
    }
  };

  return (
    <Container>
      <SearchSection>
        <SearchBar>
          <SearchInput type="text" placeholder="Search" />
          <SearchIcon>🔍</SearchIcon>
        </SearchBar>
        <SortDropdown>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option>최신순</option>
            <option>인기순</option>
            <option>평점순</option>
          </select>
        </SortDropdown>
      </SearchSection>

      <ReviewGrid>
        {reviews.map(review => (
          <ReviewCard
            key={review.reviewNo}
            review={review}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </ReviewGrid>

      <FloatingButton>
        <PlusIcon>+</PlusIcon>
      </FloatingButton>
    </Container>
  );
};

export default ReviewList;
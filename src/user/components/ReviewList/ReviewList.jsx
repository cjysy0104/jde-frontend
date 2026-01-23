import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  Container,
  ReviewGrid,
  SearchSection,
  SearchBar,
  SearchInput,
  SearchIcon,
  SortDropdown,
  FloatingButton,
  PlusIcon,
} from "./ReviewList.styled";
import { reviewApi } from "../../../utils/api";
/* =========================================================
 * 무한 스크롤 구현
 * - Intersection Observer 사용한 스크롤 감지
 * 1. hasNext: true (데이터를 더 불러올 수 있는 상태)인 경우
 *  fetchNextReviews 호출
 * 2. 컴포넌트 렌더링 이후 Intersection Observer 설정
 * - elementRef: 현재 존재하면 observer로 해당 요소 관찰
 * - 관찰할 필요가 없어지면 반환
 * 3. 추가 리뷰글 불러오기 - 비동기식
 * 4. 컴포넌트 렌더링
 * ========================================================= */



const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [cursor, setCursor] = useState(null);

    const [loading, setLoading] = useState(false);

    const elementRef = useRef(null);

    const onIntersection = (entries) => {
        const firstEntry = entries[0];

        if(firstEntry.isIntersecting && hasNext && !loading){
            fetchNextReviews();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);

        if(elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if(elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };

    }, [hasNext, loading]);

    const fetchNextReviews = async() => {
        if(loading || !hasNext) return;
        setLoading(true);

        try {
            const response = await reviewApi.getReviewList({
                cursor: cursor,
                sort: 'latest',
            });
            const data = response.data;
            console.log(data);
    
            setReviews((prevReviews) => [...prevReviews, ...data]);
    
            if(data.length === 0){
                setHasNext(false);
                return;
            } else {
                setCursor(data[data.length - 1].reviewNo);
            }
        } catch (error) {
            console.log("?", error);
        } finally {
            setLoading(false)
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
          <select defaultValue="최신순" disabled>
            <option>최신순</option>
          </select>
        </SortDropdown>
      </SearchSection>

      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewNo} review={review} />
        ))}
      </ReviewGrid>

      {hasNext ? (
        <div ref={elementRef} style={{ textAlign: "center", padding: "16px 0" }}>
            {loading ? "로딩중..." : ""}
        </div>
        ) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
            더 이상 리뷰가 없습니다.
        </div>
        )}

      <FloatingButton>
        <PlusIcon>+</PlusIcon>
      </FloatingButton>
    </Container>
  );
};

export default ReviewList;

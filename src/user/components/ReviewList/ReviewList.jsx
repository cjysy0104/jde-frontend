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
  CaptainHeader,
  CaptainHeaderTitle,
  CaptainNickname,
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



const ReviewList = ({
  mode = "ALL",          // ALL | CAPTAIN | MY 로 구분 = 전체/미식대장/내 리뷰로 구분 해봤음.
  captainNo,
  captainNickname,
}) => {
  const [reviews, setReviews] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [cursor, setCursor] = useState(null);

  const [loading, setLoading] = useState(false);

  const elementRef = useRef(null);

  const isCaptainMode = mode === "CAPTAIN";

  const onIntersection = (entries) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasNext && !loading) {
      fetchNextReviews();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };

  }, [hasNext, loading]);

  // (추가) 모드/대상(captainNo) 바뀌면 목록 초기화
  useEffect(() => {
    setReviews([]);
    setHasNext(true);
    setCursor(null);
  }, [mode, captainNo]);

  const fetchNextReviews = async () => {
    if (loading || !hasNext) return;
    
    // (추가) CAPTAIN 모드인데 captainNo 없으면 호출 중단
    if (isCaptainMode && !captainNo) return;
    
    setLoading(true);

    try {
      let response;

      if (isCaptainMode) {
        // 미식대장 리뷰 목록 호출
        response = await reviewApi.getCaptainReviewList(captainNo, {
          cursor,
          sort: "latest",
        });
      } else {
        // 기존 전체조회 호출 그대로 유지
        response = await reviewApi.getReviewList({
          cursor,
          sort: "latest",
        });
      }

      // apiClient가 response.data를 "unwrap"하므로, 여기 response는 {status, success, message, data, ...}
      const payload = response?.data ?? [];
      console.log("[ReviewList API Response]", payload);

      // 중복 key 경고 방지(같은 reviewNo가 들어오면 제거)
      const next = Array.isArray(payload) ? payload : [];

      setReviews((prev) => {
        const map = new Map(prev.map((r) => [r.reviewNo, r]));
        next.forEach((r) => map.set(r.reviewNo, r));
        return Array.from(map.values());
      });

      if (next.length === 0) {
        setHasNext(false);
        return;
      }

      setCursor(next[next.length - 1].reviewNo);
    } catch (error) {
      console.error("[ReviewList API Error]", error);
    } finally {
      setLoading(false);
    }
  };





  return (
    <Container>
      {/* CAPTAIN 모드일 때: 상단 검색/정렬 대신 타이틀 */}
      {isCaptainMode ? (
        <CaptainHeader>
          <CaptainHeaderTitle>
            미식대장 
            <CaptainNickname>{captainNickname ?? ""}</CaptainNickname>
            님의 리뷰
          </CaptainHeaderTitle>
        </CaptainHeader>
      ) : (
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
      )}

      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewNo} review={review} />
        ))}
      </ReviewGrid>

      {hasNext && !loading && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          로딩중
        </div>
      )}

      <FloatingButton>
        <PlusIcon>+</PlusIcon>
      </FloatingButton>
    </Container>
  );
};

export default ReviewList;

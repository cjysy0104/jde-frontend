import React, { useEffect, useRef, useState, useCallback } from "react";
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

  const fetchNextReviews = useCallback(async () => {
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

      // 좋아요/북마크 UI 필드 기본값 보정
      const normalized = next.map((r) => ({
        ...r,
        likeCount: Number(r.likeCount ?? 0),
        isLiked: r.isLiked ?? "N",
        isMarked: r.isMarked ?? "N",
      }));

      setReviews((prev) => {
        const map = new Map(prev.map((r) => [r.reviewNo, r]));
        normalized.forEach((r) => map.set(r.reviewNo, r));
        return Array.from(map.values());
      });

      if (normalized.length === 0) {
        setHasNext(false);
        return;
      }

      setCursor(normalized[normalized.length - 1].reviewNo);
    } catch (error) {
      console.error("[ReviewList API Error]", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasNext, isCaptainMode, captainNo, cursor]);

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
      observer.disconnect();
    };

  }, [hasNext, loading, fetchNextReviews]);

  // (추가) 모드/대상(captainNo) 바뀌면 목록 초기화
  useEffect(() => {
    setReviews([]);
    setHasNext(true);
    setCursor(null);
  }, [mode, captainNo]);

  const handleBookmark = useBookmarkToggle({
    items: reviews,
    setItems: setReviews,
    flagField: "isMarked",
    onValue: "Y",
    offValue: "N",
    errorMessage: "북마크 처리에 실패했습니다.",
  });

  const handleLike = useLikeToggle({
    items: reviews,
    setItems: setReviews,
    likedField: "isLiked",
    yesValue: "Y",
    noValue: "N",
    countField: "likeCount",
    errorMessage: "좋아요 처리에 실패했습니다.",
  });

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
          <ReviewCard
            key={review.reviewNo}
            review={review}
            onBookmark={handleBookmark}
            onLike={handleLike}
          />
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

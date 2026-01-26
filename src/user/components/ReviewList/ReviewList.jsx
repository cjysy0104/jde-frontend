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
import { useBookmarkToggle } from "../../../utils/toggles/BookmarkToggle";
import { useLikeToggle } from "../../../utils/toggles/LikeToggle";

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
  mode = "ALL",
  captainNo,
  captainNickname,
}) => {
  const [reviews, setReviews] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const elementRef = useRef(null);
  const isCaptainMode = mode === "CAPTAIN";

  useEffect(() => {
    setReviews([]);
    setHasNext(true);
    setCursor(null);
  }, [mode, captainNo]);

  const fetchNextReviews = useCallback(async () => {
    if (loading || !hasNext) return;
    if (isCaptainMode && !captainNo) return;

    setLoading(true);
    try {
      let response;

      if (isCaptainMode) {
        response = await reviewApi.getCaptainReviewList(captainNo, {
          cursor,
          sort: "latest",
        });
      } else {
        response = await reviewApi.getReviewList({
          cursor,
          sort: "latest",
        });
      }

      const payload = response?.data ?? [];
      const next = Array.isArray(payload) ? payload : [];

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

  const onIntersection = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry?.isIntersecting && hasNext && !loading) {
        fetchNextReviews();
      }
    },
    [hasNext, loading, fetchNextReviews]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
      observer.disconnect();
    };
  }, [onIntersection]);

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
      {isCaptainMode ? (
        <CaptainHeader>
          <CaptainHeaderTitle>
            미식대장 <CaptainNickname>{captainNickname ?? ""}</CaptainNickname> 님의 리뷰
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
        <div ref={elementRef} style={{ textAlign: "center" }}>
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

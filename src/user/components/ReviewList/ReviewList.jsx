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
} from "./ReviewList.styled";
import { reviewApi, bookmarkApi  } from "../../../utils/api";

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

  const fetchNextReviews = async () => {
    if (loading || !hasNext) return;
    setLoading(true);

    try {
      const response = await reviewApi.getReviewList({
        cursor,
        sort: "latest",
      });
      const data = response.data ?? [];

      // 좋아요 토글X + 채움/비움 위해 로컬 상태 uiLiked 기본값 세팅
      const normalized = data.map((r) => ({
        ...r,
        likeCount: Number(r.likeCount ?? 0),
        isLiked: r.isLiked ?? "N",
      }));

      setReviews((prev) => {
        const seen = new Set(prev.map((x) => x.reviewNo));
        const merged = [...prev];
        for (const item of normalized) {
          if (!seen.has(item.reviewNo)) {
            seen.add(item.reviewNo);
            merged.push(item);
          }
        }
        return merged;
      });

      if (normalized.length === 0) setHasNext(false);
      else setCursor(normalized[normalized.length - 1].reviewNo);
    } catch (error) {
      console.log("?", error);
    } finally {
      setLoading(false);
    }
  };

  // 북마크: 토글
  const handleBookmark = useCallback(async (reviewNo) => {
    if (!reviewNo) return;
    setReviews((prev) => 
      prev.map((r) => {
        if (r.reviewNo !== reviewNo) return r;
        const nextMarked = r.isMarked === "Y" ? "N" : "Y";
        return { ...r, isMarked: nextMarked };
      })
    );

    try {
      await bookmarkApi.toggle(reviewNo);
    } catch (e) {
      console.error(e);
      setReviews((prev) =>
        prev.map((r) => {
          if (r.reviewNo !== reviewNo) return r;
          const rollback = r.isMarked === "Y" ? "N" : "Y";
          return { ...r, isMarked: rollback };
        })
      );
      alert("북마크 처리에 실패했습니다.");
    }
  }, []);

  const handleLike = useCallback(async (reviewNo) => {
    if (!reviewNo) return;

    const target = reviews.find((r) => r.reviewNo === reviewNo);
    const prevLiked = target?.isLiked === "Y";
    const prevCount = Number(target?.likeCount ?? 0);

    const nextLiked = !prevLiked;
    const nextCount = nextLiked ? prevCount + 1 : Math.max(0, prevCount - 1);

    // 2) 낙관적 업데이트
    setReviews((prev) =>
      prev.map((r) =>
        r.reviewNo === reviewNo
          ? { ...r, isLiked: nextLiked ? "Y" : "N", likeCount: nextCount }
          : r
      )
    );


    try {
      if (nextLiked) {
        await reviewApi.likeReview(reviewNo);
      } else {
        await reviewApi.unlikeReview(reviewNo);
      }
    } catch (e) {
      const msg = e?.message || "";

      if (msg.includes("이미 좋아요")) {
        setReviews((prev) =>
          prev.map((r) =>
            r.reviewNo === reviewNo ? { ...r, isLiked: "Y" } : r
          )
        );
        return;
      }

      if (msg.includes("좋아요를 누르지 않은")) {
        setReviews((prev) =>
          prev.map((r) =>
            r.reviewNo === reviewNo ? { ...r, isLiked: "N" } : r
          )
        );
        return;
      }

      // 3) 실패 롤백
      setReviews((prev) =>
        prev.map((r) =>
          r.reviewNo === reviewNo
            ? { ...r, isLiked: prevLiked ? "Y" : "N", likeCount: prevCount }
            : r
        )
      );

      alert(msg || "좋아요 처리에 실패했습니다.");
    }
  }, [reviews]);



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
          <ReviewCard
            key={review.reviewNo}
            review={review}
            onBookmark={handleBookmark}
            onLike={handleLike}
          />
        ))}
      </ReviewGrid>

      {hasNext && !loading && (
        <div ref={elementRef} style={{textAlign: 'center'}}>
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

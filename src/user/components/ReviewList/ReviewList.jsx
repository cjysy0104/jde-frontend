import React, { useEffect, useRef, useState, useCallback, useContext } from "react";
import ReviewCard from "./ReviewCard";
import ReviewFilterModal from "./ReviewFilterModal";
import {
  Container,
  ReviewGrid,
  SearchSection,
  SearchBar,
  SearchInput,
  SearchIconButton,
  SortDropdown,
  FloatingButton,
  PlusIcon,
  CaptainHeader,
  CaptainHeaderTitle,
  CaptainNickname,
  FilterButton,
} from "./ReviewList.styled";

import { reviewApi } from "../../../utils/api";
import { useBookmarkToggle } from "../../../utils/toggles/BookmarkToggle";
import { useLikeToggle } from "../../../utils/toggles/LikeToggle";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const LABEL_TO_SORT = {
  최신순: "latest",
  과거순: "oldest",
  별점순: "rating",
  좋아요순: "liked",
};

const SORT_TO_LABEL = {
  latest: "최신순",
  oldest: "과거순",
  rating: "별점순",
  liked: "좋아요순",
};

const ReviewList = ({
  mode = "ALL",
  captainNo,
  captainNickname,
  query = "",
}) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [hasNext, setHasNext] = useState(true);

  const [cursor, setCursor] = useState(null);
  const [cursorRating, setCursorRating] = useState(null);
  const [cursorLikedCount, setCursorLikedCount] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState({
    query: "",
    minRating: null,
    maxRating: null,
    sort: "latest",
  });

  useEffect(() => {
    const q = (query ?? "").trim();
    setFilters((prev) => ({ ...prev, query: q }));
    setSearchText(q);
  }, [query]);

  useEffect(() => {
    setReviews([]);
    setHasNext(true);
    setCursor(null);
    setCursorRating(null);
    setCursorLikedCount(null);
  }, [mode, captainNo, filters]);

  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);
  const isCaptainMode = mode === "CAPTAIN";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  const onConfirmFilter = ({ sort, minRating, maxRating }) => {
    setFilters((prev) => ({
      ...prev,
      sort: sort ?? prev.sort,
      minRating: minRating ?? null,
      maxRating: maxRating ?? null,
    }));
    setIsFilterOpen(false);
  };

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
          ...filters,
          cursor,
          cursorRating: filters.sort === "rating" ? cursorRating : null,
          cursorLikedCount: filters.sort === "liked" ? cursorLikedCount : null,
        });
      }

      const payload = response?.data ?? [];
      const next = Array.isArray(payload) ? payload : [];

      const normalized = next.map((r) => ({
        ...r,
        likeCount: Number(r.likeCount ?? 0),
        rating: Number(r.rating ?? 0),
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

      const last = normalized[normalized.length - 1];

      setCursor(last.reviewNo);

      if (filters.sort === "rating") {
        setCursorRating(last.rating);
        setCursorLikedCount(null);
      } else if (filters.sort === "liked") {
        setCursorLikedCount(last.likeCount);
        setCursorRating(null);
      } else {
        setCursorRating(null);
        setCursorLikedCount(null);
      }
    } catch (error) {
      console.error("[ReviewList API Error]", error);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    hasNext,
    isCaptainMode,
    captainNo,
    cursor,
    cursorRating,
    cursorLikedCount,
    filters,
  ]);

  const onIntersection = (entries) => {
    const first = entries[0];
    if (first.isIntersecting && hasNext && !loading) fetchNextReviews();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
      observer.disconnect();
    };
  }, [hasNext, loading, fetchNextReviews]);

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

  const handleEnrollBtn = () => {
    if (!auth.isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    navigate(`/reviews/enroll`);
  };

  const applySearch = () => {
    setFilters((prev) => ({ ...prev, query: searchText.trim() }));
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") applySearch();
  };

  const onSortChange = (e) => {
    const nextSort = LABEL_TO_SORT[e.target.value] ?? "latest";
    setFilters((prev) => ({ ...prev, sort: nextSort }));
  };

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
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search"
            />

            <SearchIconButton type="button" onClick={applySearch}>
              🔍
            </SearchIconButton>

            <FilterButton type="button" onClick={openFilter}>
              필터
            </FilterButton>
          </SearchBar>

          <SortDropdown>
            <select value={SORT_TO_LABEL[filters.sort] ?? "최신순"} onChange={onSortChange}>
              <option>최신순</option>
              <option>과거순</option>
              <option>별점순</option>
              <option>좋아요순</option>
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

      {hasNext && (
        <div ref={elementRef} style={{ textAlign: "center" }}>
          {loading ? "로딩중..." : ""}
        </div>
      )}

      {auth.isAuthenticated && (
        <FloatingButton onClick={handleEnrollBtn}>
          <PlusIcon>+</PlusIcon>
        </FloatingButton>
      )}

      <ReviewFilterModal
        open={isFilterOpen}
        initial={{
          sort: filters.sort,
          minRating: filters.minRating ?? "",
          maxRating: filters.maxRating ?? "",
        }}
        onClose={closeFilter}
        onConfirm={onConfirmFilter}
      />
    </Container>
  );
};

export default ReviewList;

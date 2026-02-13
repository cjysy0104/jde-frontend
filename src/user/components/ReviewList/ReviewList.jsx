import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  useLayoutEffect,
} from "react";
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

  const isCaptainMode = mode === "CAPTAIN";

  // 캐시 키(모드/캡틴별로 분리)
  const cacheKey = `reviewList:${mode}:${captainNo ?? "ALL"}`;
  const STATE_KEY = `${cacheKey}:state`;
  const SCROLL_KEY = `${cacheKey}:scroll`;

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

  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  // 리스트 초기화 (필터/정렬/검색 바뀔 때 호출)
  const resetPagination = useCallback(() => {
    setReviews([]);
    setHasNext(true);
    setCursor(null);
    setCursorRating(null);
    setCursorLikedCount(null);
  }, []);

  // 캐시 복원 (뒤로가기 POP 시 여기로 들어옴)
  const restoredRef = useRef(false);
  const pendingScrollYRef = useRef(null);
  const skipQuerySyncOnceRef = useRef(false);

  useEffect(() => {
    restoredRef.current = false;
    pendingScrollYRef.current = null;
    skipQuerySyncOnceRef.current = false;

    const rawState = sessionStorage.getItem(STATE_KEY);
    if (!rawState) return;

    try {
      const saved = JSON.parse(rawState);

      setReviews(saved.reviews ?? []);
      setHasNext(saved.hasNext ?? true);
      setCursor(saved.cursor ?? null);
      setCursorRating(saved.cursorRating ?? null);
      setCursorLikedCount(saved.cursorLikedCount ?? null);

      setFilters(saved.filters ?? filters);
      setSearchText(saved.searchText ?? "");

      const savedY = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
      pendingScrollYRef.current = Number.isFinite(savedY) ? savedY : 0;

      restoredRef.current = true;
      skipQuerySyncOnceRef.current = true; // 복원 직후엔 query prop 동기화로 덮어쓰지 않게 1회 스킵
    } catch (e) {
      console.error("리뷰리스트 캐시 복원 실패:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STATE_KEY, SCROLL_KEY]);

  // 복원된 경우: 렌더 후 스크롤 위치 복원 (두 번 RAF로 레이아웃 안정화)
  useLayoutEffect(() => {
    if (!restoredRef.current) return;
    if (pendingScrollYRef.current == null) return;

    const y = pendingScrollYRef.current;
    pendingScrollYRef.current = null;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, left: 0, behavior: "auto" });
      });
    });
  }, [reviews.length]);

  // 캐시 저장 (리스트 페이지 떠날 때 실행됨)

  const stateRef = useRef({});
  useEffect(() => {
    stateRef.current = {
      reviews,
      hasNext,
      cursor,
      cursorRating,
      cursorLikedCount,
      filters,
      searchText,
    };
  }, [reviews, hasNext, cursor, cursorRating, cursorLikedCount, filters, searchText]);

useLayoutEffect(() => {
  return () => {
    try {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      sessionStorage.setItem(STATE_KEY, JSON.stringify(stateRef.current));
    } catch (e) {
      console.error("리뷰리스트 캐시 저장 실패:", e);
    }
  };
}, [STATE_KEY, SCROLL_KEY]);

  // 외부 query prop 동기화 (단, 캐시 복원 직후 1회는 스킵)
  useEffect(() => {
    if (skipQuerySyncOnceRef.current) {
      skipQuerySyncOnceRef.current = false;
      return;
    }

    const q = (query ?? "").trim();
    setSearchText(q);

    // query가 실제로 바뀌는 경우에만 초기화 + 반영
    setFilters((prev) => {
      const prevQ = (prev.query ?? "").trim();
      if (prevQ === q) return prev;
      resetPagination();
      return { ...prev, query: q };
    });
  }, [query, resetPagination]);

  // 모드/캡틴 바뀌면 새 리스트로 초기화
  useEffect(() => {
    resetPagination();
  }, [mode, captainNo, resetPagination]);

  const onConfirmFilter = ({ sort, minRating, maxRating }) => {
    resetPagination();
    setFilters((prev) => ({
      ...prev,
      sort: sort ?? prev.sort,
      minRating: minRating ?? null,
      maxRating: maxRating ?? null,
    }));
    setIsFilterOpen(false);
  };

  const applySearch = () => {
    resetPagination();
    setFilters((prev) => ({ ...prev, query: searchText.trim() }));
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") applySearch();
  };

  const onSortChange = (e) => {
    resetPagination();
    const nextSort = LABEL_TO_SORT[e.target.value] ?? "latest";
    setFilters((prev) => ({ ...prev, sort: nextSort }));
  };

  // 데이터 패칭
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

  // 리스트가 비었으면(초기/리셋) 첫 페이지는 무조건 한 번 가져오기
  useEffect(() => {
    if (reviews.length === 0 && hasNext && !loading) {
      fetchNextReviews();
    }
  }, [reviews.length, hasNext, loading, fetchNextReviews]);

  // IntersectionObserver로 다음 페이지 로딩
  const onIntersection = useCallback(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNext && !loading) fetchNextReviews();
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

  const handleEnrollBtn = () => {
    if (!auth.isAuthenticated) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    navigate(`/reviews/enroll`);
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
            <select
              value={SORT_TO_LABEL[filters.sort] ?? "최신순"}
              onChange={onSortChange}
            >
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

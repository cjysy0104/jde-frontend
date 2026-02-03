import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaHeart,
  FaRegCommentDots,
  FaRegBookmark,
  FaBookmark,
  FaEye,
} from "react-icons/fa";
import { bookmarkApi } from "../../../../utils/api";
import { useBookmarkToggle } from "../../../../utils/toggles/BookmarkToggle";
import { styles } from "./myBookmarksStyles";
import Modal from "../../../components/modal/Modal";

export default function MyBookmarksPage() {
  const pageSize = 20;

  const [bookmarkItems, setBookmarkItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [expandedReviewMap, setExpandedReviewMap] = useState({});
  const [hoveredReviewNo, setHoveredReviewNo] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmActionLoading, setIsConfirmActionLoading] = useState(false);
  const [pendingUnbookmarkTarget, setPendingUnbookmarkTarget] = useState(null);

  const sentinelElementRef = useRef(null);
  const isFetchingRef = useRef(false);
  const hasNextPageRef = useRef(true);
  const isLoadingRef = useRef(false);

  const setHasNextPageSafe = (value) => {
    hasNextPageRef.current = value;
    setHasNextPage(value);
  };

  const setIsLoadingSafe = (value) => {
    isLoadingRef.current = value;
    setIsLoading(value);
  };

  const extractBookmarkList = (payload) => {
    if (Array.isArray(payload?.result)) return payload.result;
    if (Array.isArray(payload?.data?.result)) return payload.data.result;
    if (Array.isArray(payload)) return payload;
    return [];
  };

  const normalizeBookmarkItem = (bookmark) => ({
    reviewNo: bookmark.reviewNo,
    thumbnailUrl: bookmark.thumbnailUrl || bookmark.imageUrl,
    restaurantName: bookmark.restaurantName,
    nickname: bookmark.writerNickname || bookmark.nickname || "작성자",
    rating: typeof bookmark.rating === "number" ? bookmark.rating : null,
    content: bookmark.content || "",
    likeCount: bookmark.likeCount ?? 0,
    commentCount: bookmark.commentCount ?? 0,
    keywords: bookmark.keywords || [],
    updateDate:
      bookmark.bookmarkEnrollDate || bookmark.reviewCreatedAt || bookmark.updateDate,
    viewCount: bookmark.viewCount,
    bookmarked: bookmark.bookmarked ?? true,
  });

  const formatDateToYmd = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value.slice(0, 10);

    const dateObject = new Date(value);
    if (Number.isNaN(dateObject.getTime())) return String(value).slice(0, 10);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getContentPreview = (text, maxLength = 60) => {
    const normalizedText = (text ?? "").toString();
    if (normalizedText.length <= maxLength) {
      return { preview: normalizedText, clipped: false };
    }
    return { preview: normalizedText.slice(0, maxLength), clipped: true };
  };

  const fetchBookmarkPage = useCallback(
    async (pageIndex, { append } = { append: true }) => {
      if (isFetchingRef.current) return;
      if (!hasNextPageRef.current && append) return;

      isFetchingRef.current = true;
      setIsLoadingSafe(true);

      try {
        const payload = await bookmarkApi.getMyBookmarks(pageIndex, pageSize);
        const bookmarkList = extractBookmarkList(payload).map(normalizeBookmarkItem);

        setBookmarkItems((previousItems) =>
          append ? [...previousItems, ...bookmarkList] : bookmarkList
        );

        setCurrentPageIndex(pageIndex);
        setHasNextPageSafe(bookmarkList.length === pageSize);
      } catch (error) {
        alert("즐겨찾기 조회 실패");
        if (!append) setBookmarkItems([]);
        setHasNextPageSafe(false);
      } finally {
        isFetchingRef.current = false;
        setIsLoadingSafe(false);
      }
    },
    [pageSize]
  );

  const resetAndFetchFirstPage = useCallback(async () => {
    setBookmarkItems([]);
    setExpandedReviewMap({});
    setCurrentPageIndex(0);
    setHasNextPageSafe(true);
    await fetchBookmarkPage(0, { append: false });
  }, [fetchBookmarkPage]);

  useEffect(() => {
    resetAndFetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sentinelElement = sentinelElementRef.current;
    if (!sentinelElement) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (isFetchingRef.current) return;
        if (isLoadingRef.current) return;
        if (!hasNextPageRef.current) return;

        fetchBookmarkPage(currentPageIndex + 1, { append: true });
      },
      { root: null, rootMargin: "350px 0px", threshold: 0 }
    );

    intersectionObserver.observe(sentinelElement);
    return () => intersectionObserver.disconnect();
  }, [currentPageIndex, fetchBookmarkPage]);

  const toggleReviewExpanded = (reviewNo) => {
    setExpandedReviewMap((previousMap) => ({
      ...previousMap,
      [reviewNo]: !previousMap[reviewNo],
    }));
  };

  const toggleBookmark = useBookmarkToggle({
    items: bookmarkItems,
    setItems: setBookmarkItems,
    flagField: "bookmarked",
    onValue: true,
    offValue: false,
    removeWhenOff: true,
    confirmWhenOff: false,
    errorMessage: "즐겨찾기 토글 실패",
  });

  const handleBookmarkButtonClick = (bookmarkItem) => {
    if (bookmarkItem.bookmarked) {
      setPendingUnbookmarkTarget({
        reviewNo: bookmarkItem.reviewNo,
        restaurantName: bookmarkItem.restaurantName,
      });
      setIsConfirmModalOpen(true);
      return;
    }
    toggleBookmark(bookmarkItem.reviewNo);
  };

  const closeConfirmModal = () => {
    if (isConfirmActionLoading) return;
    setIsConfirmModalOpen(false);
    setPendingUnbookmarkTarget(null);
  };

  const confirmUnbookmark = async () => {
    if (!pendingUnbookmarkTarget?.reviewNo) return;

    setIsConfirmActionLoading(true);
    try {
      await Promise.resolve(toggleBookmark(pendingUnbookmarkTarget.reviewNo));
      closeConfirmModal();
    } finally {
      setIsConfirmActionLoading(false);
    }
  };

  const skeletonCardKeys = useMemo(
    () => Array.from({ length: 6 }, (_, index) => index),
    []
  );

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>내 즐겨찾기</h2>
        <button
          onClick={resetAndFetchFirstPage}
          disabled={isLoading}
          style={styles.refreshBtn(isLoading)}
        >
          새로고침
        </button>
      </div>

      {bookmarkItems.length === 0 ? (
        <div style={styles.empty}>
          {isLoading ? (
            <div style={styles.skeletonGrid}>
              {skeletonCardKeys.map((key) => (
                <div key={key} style={styles.skeletonCard} />
              ))}
            </div>
          ) : (
            "목록이 없습니다."
          )}
        </div>
      ) : (
        <div style={styles.grid3}>
          {bookmarkItems.map((bookmarkItem) => {
            const { preview, clipped } = getContentPreview(bookmarkItem.content, 60);
            const isExpanded = !!expandedReviewMap[bookmarkItem.reviewNo];

            return (
              <div
                key={bookmarkItem.reviewNo}
                style={{
                  ...styles.card,
                  ...(hoveredReviewNo === bookmarkItem.reviewNo ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredReviewNo(bookmarkItem.reviewNo)}
                onMouseLeave={() => setHoveredReviewNo(null)}
              >
                <div style={styles.mediaWrap}>
                  <img
                    src={
                      bookmarkItem.thumbnailUrl ||
                      "https://via.placeholder.com/900x700?text=IMG"
                    }
                    alt={bookmarkItem.restaurantName}
                    style={styles.media}
                    loading="lazy"
                  />

                  <div style={styles.profileBubble}>
                    <img
                      src="/src/assets/logo.png"
                      alt="Profile"
                      style={styles.profileImg}
                    />
                  </div>
                </div>

                <div style={styles.meta}>
                  <div style={styles.actionBar}>
                    <button type="button" style={styles.actionBtn} disabled>
                      <FaHeart color="#ff6b6b" />
                      {bookmarkItem.likeCount}
                    </button>

                    <button type="button" style={styles.actionBtn} disabled>
                      <FaRegCommentDots color="#666" />
                      {bookmarkItem.commentCount}
                    </button>

                    <button
                      type="button"
                      style={styles.actionBtn}
                      onClick={() => handleBookmarkButtonClick(bookmarkItem)}
                      aria-label="bookmark-toggle"
                      title="즐겨찾기 토글"
                    >
                      {bookmarkItem.bookmarked ? (
                        <FaBookmark color="#333" />
                      ) : (
                        <FaRegBookmark color="#666" />
                      )}
                    </button>
                  </div>

                  <h3 style={styles.restaurantName}>{bookmarkItem.restaurantName}</h3>

                  <div style={styles.userInfo}>
                    <span style={styles.nickname}>{bookmarkItem.nickname}</span>
                    {typeof bookmarkItem.rating === "number" && (
                      <span style={styles.rating}>
                        ⭐ {bookmarkItem.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <p style={styles.description}>
                    {isExpanded ? bookmarkItem.content : preview}
                    {clipped && (
                      <button
                        type="button"
                        style={styles.moreBtn}
                        onClick={() => toggleReviewExpanded(bookmarkItem.reviewNo)}
                      >
                        {isExpanded ? "접기" : "...더보기"}
                      </button>
                    )}
                  </p>

                  {Array.isArray(bookmarkItem.keywords) &&
                    bookmarkItem.keywords.length > 0 && (
                      <div style={styles.keywordContainer}>
                        {bookmarkItem.keywords.map((keyword) => (
                          <span
                            key={keyword.keywordNo ?? keyword.keywordName ?? keyword}
                            style={styles.keywordBadge}
                          >
                            #{keyword.keywordName ?? keyword}
                          </span>
                        ))}
                      </div>
                    )}

                  <div style={styles.footer}>
                    <span style={styles.dateLine}>
                      {formatDateToYmd(bookmarkItem.updateDate)}
                    </span>

                    {bookmarkItem.viewCount !== undefined &&
                      bookmarkItem.viewCount !== null && (
                        <span style={styles.viewCount}>
                          <FaEye />
                          {bookmarkItem.viewCount}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div ref={sentinelElementRef} style={{ height: 1 }} />

      <div style={styles.bottomStatus}>
        {isLoading && bookmarkItems.length > 0 && (
          <div style={styles.bottomText}>불러오는 중...</div>
        )}
        {!isLoading && !hasNextPage && bookmarkItems.length > 0 && (
          <div style={styles.bottomText}>마지막입니다.</div>
        )}
      </div>

      {isConfirmModalOpen && (
        <Modal
          title="즐겨찾기 해제"
          onClose={closeConfirmModal}
          onPrimary={confirmUnbookmark}
          primaryText={isConfirmActionLoading ? "처리중..." : "해제"}
          cancelText="취소"
          maxWidth={420}
        >
          <div style={{ fontWeight: 800, color: "#111827" }}>
            정말 해제하시겠습니까?
          </div>
        </Modal>
      )}
    </div>
  );
}

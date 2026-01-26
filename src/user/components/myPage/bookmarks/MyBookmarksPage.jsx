import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaHeart,
  FaRegCommentDots,
  FaRegBookmark,
  FaBookmark,
  FaEye,
} from "react-icons/fa";
import { bookmarkApi } from "../../../../utils/api";
import { useBookmarkToggle } from "../../../../utils/toggles/BookmarkToggle";
import { styles } from "./MyBookmarksStyles";

export default function MyBookmarksPage() {
  const size = 20;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [hovered, setHovered] = useState(null);

  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);

  const pickList = (payload) => {
    if (Array.isArray(payload?.result)) return payload.result;
    if (Array.isArray(payload?.data?.result)) return payload.data.result;
    if (Array.isArray(payload)) return payload;
    return [];
  };

  // ✅ 팀원 카드 필드와 최대한 맞춰줌(없으면 기존 값 fallback)
  const normalize = (b) => ({
    reviewNo: b.reviewNo,
    thumbnailUrl: b.thumbnailUrl || b.imageUrl,
    restaurantName: b.restaurantName || b.normalName || b.storeName || "식당명",
    nickname: b.nickname || b.writerNickname || "작성자",
    rating: typeof b.rating === "number" ? b.rating : null,
    content: b.content || "",
    likeCount: b.likeCount ?? 0,
    commentCount: b.commentCount ?? 0,
    keywords: b.keywords || [],
    updateDate: b.updateDate || b.reviewUpdatedAt || b.reviewCreatedAt || b.createdAt || b.bookmarkEnrollDate,
    viewCount: b.viewCount, // 있으면 그대로 유지
    bookmarked: b.bookmarked ?? true,
  });

  const formatDate = (v) => {
    if (!v) return "";
    if (typeof v === "string") return v.slice(0, 10);
    try {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return String(v).slice(0, 10);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    } catch {
      return String(v).slice(0, 10);
    }
  };

  const getPreview = (text, max = 60) => {
    const t = (text ?? "").toString();
    if (t.length <= max) return { preview: t, clipped: false };
    return { preview: t.slice(0, max), clipped: true };
  };

  const loadPage = async (p, { append } = { append: true }) => {
    if (fetchingRef.current) return;
    if (!hasNext && append) return;

    fetchingRef.current = true;
    setLoading(true);
    try {
      const payload = await bookmarkApi.getMyBookmarks(p, size);
      const arr = pickList(payload).map(normalize);

      setItems((prev) => (append ? [...prev, ...arr] : arr));
      setPage(p);
      setHasNext(arr.length === size);
    } catch (e) {
      console.error(e);
      alert("즐겨찾기 조회 실패");
      if (!append) setItems([]);
      setHasNext(false);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  };

  const resetAndLoadFirst = async () => {
    setItems([]);
    setExpanded({});
    setPage(0);
    setHasNext(true);
    await loadPage(0, { append: false });
  };

  useEffect(() => {
    resetAndLoadFirst();
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (loading || !hasNext) return;
        loadPage(page + 1, { append: true });
      },
      { root: null, rootMargin: "350px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [page, hasNext, loading]);

  const toggleExpand = (reviewNo) => {
    setExpanded((prev) => ({ ...prev, [reviewNo]: !prev[reviewNo] }));
  };

  const toggleBookmark = useBookmarkToggle({
    items,
    setItems,
    flagField: "bookmarked",
    onValue: true,
    offValue: false,
    removeWhenOff: true,
    confirmWhenOff: true,
    confirmMessage: "정말 해제하시겠습니까?",
    errorMessage: "즐겨찾기 토글 실패",
  });

  const pagesForSkeleton = useMemo(
    () => Array.from({ length: 6 }, (_, i) => i),
    []
  );

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>내 즐겨찾기</h2>
        <button
          onClick={resetAndLoadFirst}
          disabled={loading}
          style={styles.refreshBtn(loading)}
        >
          새로고침
        </button>
      </div>

      {items.length === 0 ? (
        <div style={styles.empty}>
          {loading ? (
            <div style={styles.skeletonGrid}>
              {pagesForSkeleton.map((i) => (
                <div key={i} style={styles.skeletonCard} />
              ))}
            </div>
          ) : (
            "목록이 없습니다."
          )}
        </div>
      ) : (
        <div style={styles.grid3}>
          {items.map((b) => {
            const { preview, clipped } = getPreview(b.content, 60);
            const isExpanded = !!expanded[b.reviewNo];

            return (
              <div
                key={b.reviewNo}
                style={{
                  ...styles.card,
                  ...(hovered === b.reviewNo ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHovered(b.reviewNo)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={styles.mediaWrap}>
                  <img
                    src={b.thumbnailUrl || "https://via.placeholder.com/900x700?text=IMG"}
                    alt={b.restaurantName}
                    style={styles.media}
                    loading="lazy"
                  />

                  <div style={styles.profileBubble}>
                    <img src="/src/assets/logo.png" alt="Profile" style={styles.profileImg} />
                  </div>
                </div>

                <div style={styles.meta}>
                  <div style={styles.actionBar}>
                    <button type="button" style={styles.actionBtn} disabled>
                      <FaHeart color="#ff6b6b" />
                      {b.likeCount}
                    </button>

                    <button type="button" style={styles.actionBtn} disabled>
                      <FaRegCommentDots color="#666" />
                      {b.commentCount}
                    </button>

                    <button
                      type="button"
                      style={styles.actionBtn}
                      onClick={() => toggleBookmark(b.reviewNo)}
                      aria-label="bookmark-toggle"
                      title="즐겨찾기 토글"
                    >
                      {b.bookmarked ? (
                        <FaBookmark color="#333" />
                      ) : (
                        <FaRegBookmark color="#666" />
                      )}
                    </button>
                  </div>

                  <h3 style={styles.restaurantName}>{b.restaurantName}</h3>

                  <div style={styles.userInfo}>
                    <span style={styles.nickname}>{b.nickname}</span>
                    {typeof b.rating === "number" && (
                      <span style={styles.rating}>⭐ {b.rating.toFixed(1)}</span>
                    )}
                  </div>

                  <p style={styles.description}>
                    {isExpanded ? b.content : preview}
                    {clipped && (
                      <button
                        type="button"
                        style={styles.moreBtn}
                        onClick={() => toggleExpand(b.reviewNo)}
                      >
                        {isExpanded ? "접기" : "...더보기"}
                      </button>
                    )}
                  </p>

                  {Array.isArray(b.keywords) && b.keywords.length > 0 && (
                    <div style={styles.keywordContainer}>
                      {b.keywords.map((k) => (
                        <span
                          key={k.keywordNo ?? k.keywordName ?? k}
                          style={styles.keywordBadge}
                        >
                          #{k.keywordName ?? k}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={styles.footer}>
                    <span style={styles.dateLine}>{formatDate(b.updateDate)}</span>

                    {b.viewCount !== undefined && b.viewCount !== null && (
                      <span style={styles.viewCount}>
                        <FaEye />
                        {b.viewCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />

      <div style={styles.bottomStatus}>
        {loading && items.length > 0 && <div style={styles.bottomText}>불러오는 중...</div>}
        {!loading && !hasNext && items.length > 0 && (
          <div style={styles.bottomText}>마지막입니다.</div>
        )}
      </div>
    </div>
  );
}

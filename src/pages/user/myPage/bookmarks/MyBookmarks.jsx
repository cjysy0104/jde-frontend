import React, { useEffect, useState } from "react";
import { bookmarkApi } from "../../../../utils/api";
import ReviewCard from "../../components/ReviewCard";
import { styles } from "../lists/myListStyles";

export default function MyBookmarksPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  const size = 20;
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const load = async (p = 0) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await bookmarkApi.getMyBookmarks(p, size);
      const list = data?.result ?? data;
      const arr = Array.isArray(list) ? list : [];

      setItems(arr);
      setPage(p);

      // 다음 여부: size만큼 꽉 차면 다음 있을 가능성
      setHasNext(arr.length === size);
    } catch (e) {
      console.error(e);
      alert("즐겨찾기 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = async (reviewNo) => {
    if (loading) return;
    try {
      await bookmarkApi.toggle(reviewNo);
      await load(page);
    } catch (e) {
      console.error(e);
      alert("즐겨찾기 해제 실패");
    }
  };

  // 페이지 번호(현재 기준 5개 노출)
  const visibleCount = 5;
  const start = Math.max(0, page - 2);
  const end = start + visibleCount - 1;
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const goPrev = () => {
    if (page === 0) return;
    load(page - 1);
  };

  const goNext = () => {
    if (!hasNext) return;
    load(page + 1);
  };

  return (
    <div>
      {/* MyListPage 톤의 헤더 */}
      <div style={styles.headerRow}>
        <h2 style={styles.title}>내 즐겨찾기</h2>
      </div>

      {/* 카드 영역: MyListPage 카드 컨테이너 톤으로 감싸기 */}
      {items.length === 0 ? (
        <div style={styles.empty}>{loading ? "로딩중..." : "목록이 없습니다."}</div>
      ) : (
        <div style={styles.grid3}>
          {items.map((b, idx) => (
            <div key={b.reviewNo ?? idx} style={styles.card}>
              <ReviewCard
                review={{
                  restaurantName: b.storeName || b.restaurantName || "맛집",
                  rating: b.rating ?? 0,
                  category: b.category || "",
                  image: b.thumbnailUrl || b.imageUrl || "https://via.placeholder.com/300x200?text=IMG",
                }}
              />

              <button onClick={() => toggle(b.reviewNo)} style={styles.fullBtn}>
                즐겨찾기 해제
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={styles.pagerWrap}>
        <button
          disabled={page === 0 || loading}
          onClick={goPrev}
          style={styles.pagerNavBtn(page === 0 || loading)}
        >
          이전
        </button>

        {pages.map((p) => (
          <button key={p} onClick={() => load(p)} style={styles.pagerBtn(p === page)} disabled={loading}>
            {p + 1}
          </button>
        ))}

        <button
          disabled={!hasNext || loading}
          onClick={goNext}
          style={styles.pagerNavBtn(!hasNext || loading)}
        >
          다음
        </button>
      </div>
    </div>
  );
}

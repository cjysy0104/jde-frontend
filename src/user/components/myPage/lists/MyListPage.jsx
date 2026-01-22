import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { myActivityApi } from "../../../../utils/api";
import { styles } from "./myListStyles";

export default function MyListPage() {
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();
  const type = sp.get("type") ?? "review"; // review | comment
  const isReviews = useMemo(() => type === "review", [type]);

  const size = 10;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 페이지네이션 상태 (cursor 기반을 페이지처럼)
  const [page, setPage] = useState(0); // 0부터
  const [hasNext, setHasNext] = useState(true);

  // pageCursor[p] = p페이지를 불러올 때 사용했던 cursor(= 이전 페이지 마지막 cursor)
  // - 0페이지는 cursor=null
  const [pageCursor, setPageCursor] = useState([null]);

  useEffect(() => {
    // 탭(type) 바뀌면 전부 초기화
    setItems([]);
    setLoading(false);
    setPage(0);
    setHasNext(true);
    setPageCursor([null]);
    fetchPage(0, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const fetchPage = async (targetPage, cursorForPage) => {
    if (loading) return;

    setLoading(true);
    try {
      const data = isReviews
        ? await myActivityApi.getMyReviews({ size, cursor: cursorForPage })
        : await myActivityApi.getMyComments({ size, cursor: cursorForPage });

      const list = data?.result ?? [];

      // size+1 방식
      const next = list.length > size;
      const sliced = next ? list.slice(0, size) : list;

      setItems(sliced);
      setHasNext(next);
      setPage(targetPage);

      // 다음 페이지 cursor 저장: "현재 페이지의 마지막 item id"
      if (next && sliced.length > 0) {
        const last = sliced[sliced.length - 1];
        const nextCursor = isReviews ? last.reviewNo : last.commentNo;

        setPageCursor((prev) => {
          const copy = [...prev];
          // targetPage+1 위치에 "다음 페이지를 불러오기 위한 cursor" 저장
          copy[targetPage + 1] = nextCursor;
          return copy;
        });
      }
    } catch (e) {
      console.error(e);
      alert("내 리뷰/댓글 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteReview = async (reviewNo) => {
    if (!window.confirm("리뷰를 삭제할까요?")) return;
    try {
      await myActivityApi.deleteReview(reviewNo);
      // 현재 페이지 다시 로드 (삭제 후 페이지 유지)
      fetchPage(page, pageCursor[page] ?? null);
      alert("삭제 완료");
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  const onDeleteComment = async (commentNo) => {
    if (!window.confirm("댓글을 삭제할까요?")) return;
    try {
      await myActivityApi.deleteComment(commentNo);
      fetchPage(page, pageCursor[page] ?? null);
      alert("삭제 완료");
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  const goEditReview = (reviewNo) => navigate(`/reviews/${reviewNo}/edit`);
  const goEditComment = (commentNo) => navigate(`/comments/${commentNo}/edit`);

  // 페이지 버튼(1 2 3 4 5) 범위 계산
  const visibleCount = 5;
  const start = Math.max(0, page - 2);
  const end = Math.min(
    start + visibleCount - 1,
    // 우리가 "방문해본/알고있는" 마지막 페이지 인덱스
    Math.max(0, pageCursor.length - 1)
  );
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const goPrev = () => {
    if (page === 0) return;
    const prevPage = page - 1;
    fetchPage(prevPage, pageCursor[prevPage] ?? null);
  };

  const goNext = () => {
    if (!hasNext) return;
    const nextPage = page + 1;
    fetchPage(nextPage, pageCursor[nextPage] ?? null);
  };

  const goPage = (p) => {
    fetchPage(p, pageCursor[p] ?? null);
  };

  return (
    <div>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>내 리뷰/댓글</h2>

        <div style={styles.tabGroup}>
          <button onClick={() => setSp({ type: "review" })} style={styles.pillBtn(type === "review")}>
            리뷰
          </button>
          <button onClick={() => setSp({ type: "comment" })} style={styles.pillBtn(type === "comment")}>
            댓글
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={styles.empty}>{loading ? "로딩중..." : "목록이 없습니다."}</div>
      ) : isReviews ? (
        <div style={styles.list}>
          {items.map((r) => (
            <div key={r.reviewNo} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.cardTitle}>{r.restaurantName}</div>
                  <div style={styles.meta}>
                    {r.nickname} · ⭐ {r.rating} · 👍 {r.likeCount} · 💬 {r.commentCount}
                  </div>
                </div>

                <div style={styles.btnRow}>
                  <a href={`/reviews/${r.reviewNo}`} style={styles.btnLink}>
                    상세
                  </a>
                  <button onClick={() => goEditReview(r.reviewNo)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => onDeleteReview(r.reviewNo)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>

              <div style={styles.content}>{r.content}</div>
              <div style={styles.footer}>업데이트: {String(r.updateDate)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.list}>
          {items.map((c) => (
            <div key={c.commentNo} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.cardTitle}>리뷰 #{c.reviewNo}</div>
                  <div style={styles.meta}>
                    {c.nickname} · 👍 {c.likeCount} · 작성일 {String(c.commentDate)}
                  </div>
                </div>

                <div style={styles.btnRow}>
                  <a href={`/reviews/${c.reviewNo}`} style={styles.btnLink}>
                    리뷰로
                  </a>
                  <button onClick={() => goEditComment(c.commentNo)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => onDeleteComment(c.commentNo)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>

              <div style={styles.content}>{c.content}</div>
            </div>
          ))}
        </div>
      )}

      {/*  페이지네이션 (이전 1 2 3 다음) */}
      <div style={styles.pagerWrap}>
        <button disabled={page === 0 || loading} onClick={goPrev} style={styles.pagerNavBtn(page === 0 || loading)}>
          이전
        </button>

        {pages.map((p) => (
          <button key={p} onClick={() => goPage(p)} style={styles.pagerBtn(p === page)} disabled={loading}>
            {p + 1}
          </button>
        ))}

        <button disabled={!hasNext || loading} onClick={goNext} style={styles.pagerNavBtn(!hasNext || loading)}>
          다음
        </button>
      </div>
    </div>
  );
}

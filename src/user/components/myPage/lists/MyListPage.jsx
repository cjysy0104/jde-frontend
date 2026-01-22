import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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

  // ✅ page는 0-based(UI용)
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  // ✅ 백엔드 cursor는 "페이지 번호(1부터)"로 사용
  // pageCursor[p] = 백엔드에 보낼 cursor 값 (1-based)
  // 0페이지 -> cursor=1
  const [pageCursor, setPageCursor] = useState([1]);

  const inFlightRef = useRef(false);
  const reqSeqRef = useRef(0);

  const normalizeList = (maybeAxiosResponse) => {
  const payload = maybeAxiosResponse?.data ?? maybeAxiosResponse; // ✅ 핵심

  // SuccessResponse 형태: { status, success, message, result, timeStamp }
  const r = payload?.result;

  // result가 리스트거나, 내부에 list/content/items로 들어올 수도 있게 방어
  const list =
    r?.list ??
    r?.content ??
    r?.items ??
    r ??
    payload?.list ??
    payload?.items ??
    [];

  return Array.isArray(list) ? list : [];
};

  const fetchPage = useCallback(
    async (targetPage) => {
      if (inFlightRef.current) return;

      inFlightRef.current = true;
      setLoading(true);

      const myReq = ++reqSeqRef.current;

      try {
        // ✅ targetPage(0-based) -> cursor(1-based)
        const cursorForBackend = targetPage + 1;

        // ✅ size+1로 다음 페이지 존재 여부 판단 (백엔드가 그대로 size만큼만 주면 hasNext는 정확히 못 잡음)
        // 그래도 최소한 목록은 뜬다. (정확한 hasNext는 아래 보완 로직으로 처리)
        const data = isReviews
          ? await myActivityApi.getMyReviews({ size: size + 1, cursor: cursorForBackend })
          : await myActivityApi.getMyComments({ size: size + 1, cursor: cursorForBackend });

        console.log("raw api response =", data);
        console.log("normalized list =", normalizeList(data));

        if (myReq !== reqSeqRef.current) return;

        const list = normalizeList(data);

        // ✅ size+1 방식
        const next = list.length > size;
        const sliced = next ? list.slice(0, size) : list;

        setItems(sliced);
        setHasNext(next);
        setPage(targetPage);

        // ✅ 방문 가능한 페이지 커서 저장(다음 페이지 번호)
        // 다음 페이지는 targetPage+1 -> cursor = (targetPage+1)+1 = targetPage+2
        setPageCursor((prev) => {
          const copy = [...prev];
          copy[targetPage] = targetPage + 1; // 현재 페이지 cursor
          copy[targetPage + 1] = targetPage + 2; // 다음 페이지 cursor
          return copy;
        });
      } catch (e) {
        console.error(e);
        alert("내 리뷰/댓글 조회 실패");
        setItems([]);
        setHasNext(false);
      } finally {
        if (myReq === reqSeqRef.current) setLoading(false);
        inFlightRef.current = false;
      }
    },
    [isReviews, size]
  );

  useEffect(() => {
    reqSeqRef.current++;
    inFlightRef.current = false;

    setItems([]);
    setPage(0);
    setHasNext(true);
    setPageCursor([1]);

    fetchPage(0);
  }, [type, fetchPage]);

  const onDeleteReview = async (reviewNo) => {
    if (!window.confirm("리뷰를 삭제할까요?")) return;
    try {
      await myActivityApi.deleteReview(reviewNo);
      fetchPage(page);
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
      fetchPage(page);
      alert("삭제 완료");
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  const goEditReview = (reviewNo) => navigate(`/reviews/${reviewNo}/edit`);
  const goEditComment = (commentNo) => navigate(`/comments/${commentNo}/edit`);

  // 페이지 버튼(1 2 3 4 5) — "현재까지 방문한 페이지" 기준으로 보여줌
  const knownLastPage = Math.max(0, pageCursor.length - 1);
  const visibleCount = 5;
  const start = Math.max(0, page - 2);
  const end = Math.min(start + visibleCount - 1, knownLastPage);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const goPrev = () => {
    if (page === 0) return;
    fetchPage(page - 1);
  };

  const goNext = () => {
    if (!hasNext) return;
    fetchPage(page + 1);
  };

  const goPage = (p) => fetchPage(p);

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
            <div key={r.reviewNo ?? r.reviewId ?? r.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.cardTitle}>{r.restaurantName ?? "가게명 없음"}</div>
                  <div style={styles.meta}>
                    {r.nickname} · ⭐ {r.rating} · 👍 {r.likeCount} · 💬 {r.commentCount}
                  </div>
                </div>

                <div style={styles.btnRow}>
                  <a href={`/reviews/${r.reviewNo ?? r.reviewId ?? r.id}`} style={styles.btnLink}>
                    상세
                  </a>
                  <button onClick={() => goEditReview(r.reviewNo ?? r.reviewId ?? r.id)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => onDeleteReview(r.reviewNo ?? r.reviewId ?? r.id)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>

              <div style={styles.content}>{r.content}</div>
              <div style={styles.footer}>업데이트: {String(r.updateDate ?? r.updatedAt ?? "")}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.list}>
          {items.map((c) => (
            <div key={c.commentNo ?? c.commentId ?? c.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <div style={styles.cardTitle}>리뷰 #{c.reviewNo ?? c.reviewId ?? "?"}</div>
                  <div style={styles.meta}>
                    {c.nickname} · 👍 {c.likeCount} · 작성일 {String(c.commentDate ?? c.createdAt ?? "")}
                  </div>
                </div>

                <div style={styles.btnRow}>
                  <a href={`/reviews/${c.reviewNo ?? c.reviewId ?? ""}`} style={styles.btnLink}>
                    리뷰로
                  </a>
                  <button onClick={() => goEditComment(c.commentNo ?? c.commentId ?? c.id)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => onDeleteComment(c.commentNo ?? c.commentId ?? c.id)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>

              <div style={styles.content}>{c.content}</div>
            </div>
          ))}
        </div>
      )}

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

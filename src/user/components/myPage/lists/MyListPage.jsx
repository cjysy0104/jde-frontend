import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { myActivityApi } from "../../../../utils/api";
import { styles } from "./myListStyles";

export default function MyListPage() {
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();
  const type = sp.get("type") ?? "review";
  const isReviews = useMemo(() => type === "review", [type]);

  const size = 10;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const [pageCursor, setPageCursor] = useState([1]);

  const inFlightRef = useRef(false);
  const reqSeqRef = useRef(0);

  const normalizeList = (input) => {
    const payload = input?.data ?? input;
    if (Array.isArray(payload)) return payload;

    const r = payload?.result ?? payload?.data;
    const list =
      r?.list ??
      r?.content ??
      r?.items ??
      r ??
      payload?.list ??
      payload?.items ??
      payload?.result ??
      payload?.data ??
      [];
    return Array.isArray(list) ? list : [];
  };

  const cut20 = (s) => {
    if (!s) return "내용 없음";
    return s.length > 20 ? s.slice(0, 20) + "…" : s;
  };

  const fmt = (v) => (v ? String(v) : "-");

  const pickReviewCreated = (obj) => obj?.createDate;
  const pickReviewUpdated = (obj) => obj?.updateDate;
  const pickCommentCreated = (obj) => obj?.commentDate;

  const fetchPage = useCallback(
    async (targetPage) => {
      if (inFlightRef.current) return;

      inFlightRef.current = true;
      setLoading(true);

      const myReq = ++reqSeqRef.current;

      try {
        const cursorForBackend = targetPage + 1;

        const data = isReviews
          ? await myActivityApi.getMyReviews({ size: size + 1, cursor: cursorForBackend })
          : await myActivityApi.getMyComments({ size: size + 1, cursor: cursorForBackend });

        const list = normalizeList(data);

        if (myReq !== reqSeqRef.current) return;

        const next = list.length > size;
        const sliced = next ? list.slice(0, size) : list;

        setItems(sliced);
        setHasNext(next);
        setPage(targetPage);

        setPageCursor((prev) => {
          const copy = [...prev];
          copy[targetPage] = targetPage + 1;
          copy[targetPage + 1] = targetPage + 2;
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

  const knownLastPage = Math.max(0, pageCursor.length - 1);
  const visibleCount = 5;
  const start = Math.max(0, page - 2);
  const end = Math.min(start + visibleCount - 1, knownLastPage);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const goPrev = () => page > 0 && fetchPage(page - 1);
  const goNext = () => hasNext && fetchPage(page + 1);
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
        // 리뷰 카드
        <div style={styles.list}>
          {items.map((r, idx) => {
            const id = r.reviewNo ?? r.reviewId ?? r.id;

            const key = id != null ? `review-${id}` : `review-idx-${idx}`;
            const created = fmt(pickReviewCreated(r));
            const updated = fmt(pickReviewUpdated(r));

            return (
              <div key={key} style={styles.reviewCard}>
                <div style={styles.reviewThumbWrap}>
                  {r.thumbnailUrl ? (
                    <img src={r.thumbnailUrl} alt="thumbnail" style={styles.reviewThumbImg} />
                  ) : (
                    <div style={styles.reviewThumbFallback}>썸네일</div>
                  )}
                </div>

                <div style={styles.reviewBlackArea}>
                  <div style={styles.reviewHeadline}>{cut20(r.content)}</div>
                  <div style={styles.reviewShopName}>{r.restaurantName ?? "가게명"}</div>

                  <div style={styles.reviewMetaRow}>
                    <span style={styles.reviewMetaChip}>⭐ {r.rating ?? 0}</span>
                    <span style={styles.reviewMetaChip}>👍 {r.likeCount ?? 0}</span>
                    <span style={styles.reviewMetaChip}>💬 {r.commentCount ?? 0}</span>
                    <span style={styles.reviewMetaChip}>👁 {r.viewCount ?? 0}</span>
                  </div>

                  <div style={styles.reviewDates}>
                    <div>작성일: {created}</div>
                    <div>업데이트: {updated}</div>
                  </div>
                </div>

                <div style={styles.reviewActionCol}>
                  <button onClick={() => goEditReview(id)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => onDeleteReview(id)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // 댓글 카드
        <div style={styles.list}>
          {items.map((c, idx) => {
            const commentId = c.commentNo ?? c.commentId ?? c.id;

            const key = commentId != null ? `comment-${commentId}` : `comment-idx-${idx}`;
            const reviewNo = c.reviewNo ?? c.reviewId;
            const created = fmt(pickCommentCreated(c));
            const headline = cut20(c.reviewContentPreview || c.content);

            return (
              <div key={key} style={styles.commentCard}>
                <div style={styles.commentBody}>
                  <div style={styles.commentHeadline}>{headline}</div>

                  <div style={styles.commentMetaRow}>
                    <span style={styles.commentMetaText}>👍 {c.likeCount ?? 0}</span>
                    <span style={styles.dot}>·</span>
                    <span style={styles.commentMetaText}>작성일 {created}</span>
                    <span style={styles.dot}>·</span>
                    <span style={styles.commentMetaText}>{c.restaurantName ?? "식당명"}</span>
                  </div>

                  <div style={styles.commentContent}>{c.content}</div>
                </div>

                <div style={styles.commentActionCol}>
                  <a href={`/reviews/${reviewNo ?? ""}`} style={styles.btnOutline}>
                    리뷰로
                  </a>
                  <button onClick={() => goEditComment(commentId)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => onDeleteComment(commentId)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
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

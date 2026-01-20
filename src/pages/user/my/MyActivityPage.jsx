import { useEffect, useMemo, useState } from "react";
import { myActivityApi } from "../../../utils/api";
import { styles } from "./myListStyles";
import { useNavigate } from "react-router-dom";

export default function MyActivityPage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("reviews"); // reviews | comments
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const size = 10;
  const isReviews = useMemo(() => tab === "reviews", [tab]);

  useEffect(() => {
    setItems([]);
    setCursor(null);
    setHasNext(true);
    fetchMore(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const fetchMore = async (isFirst = false) => {
    if (loading) return;
    if (!hasNext && !isFirst) return;

    setLoading(true);
    try {
      const data = isReviews
        ? await myActivityApi.getMyReviews({ size, cursor: isFirst ? null : cursor })
        : await myActivityApi.getMyComments({ size, cursor: isFirst ? null : cursor });

      const list = data?.result ?? [];

      // sizePlusOne 방식 (서버가 size+1로 내려주는 구조면 아래 로직 그대로)
      const next = list.length > size;
      const sliced = next ? list.slice(0, size) : list;

      setItems((prev) => (isFirst ? sliced : [...prev, ...sliced]));
      setHasNext(next);

      if (sliced.length > 0) {
        const last = sliced[sliced.length - 1];
        setCursor(isReviews ? last.reviewNo : last.commentNo);
      }
    } catch (e) {
      console.error(e);
      alert("내 활동 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 삭제
  const onDeleteReview = async (reviewNo) => {
    if (!window.confirm("리뷰를 삭제할까요?")) return;
    try {
      await myActivityApi.deleteReview(reviewNo);
      setItems((prev) => prev.filter((x) => x.reviewNo !== reviewNo));
      alert("삭제 완료");
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  // 댓글 삭제
  const onDeleteComment = async (commentNo) => {
    if (!window.confirm("댓글을 삭제할까요?")) return;
    try {
      await myActivityApi.deleteComment(commentNo);
      setItems((prev) => prev.filter((x) => x.commentNo !== commentNo));
      alert("삭제 완료");
    } catch (e) {
      console.error(e);
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  // 수정은 페이지 이동 (너희 라우트에 맞게 path만 바꾸면 됨)
  const goEditReview = (reviewNo) => navigate(`/reviews/${reviewNo}/edit`);
  const goEditComment = (commentNo) => navigate(`/comments/${commentNo}/edit`);

  return (
    <div style={styles.wrap}>
      <h2 style={styles.title}>내 리뷰 / 내 댓글</h2>

      {/* 페이지 내부 탭 */}
      <div style={styles.tabRow}>
        <button onClick={() => setTab("reviews")} style={styles.tabBtn(tab === "reviews")}>
          내 리뷰
        </button>
        <button onClick={() => setTab("comments")} style={styles.tabBtn(tab === "comments")}>
          내 댓글
        </button>
      </div>

      {/* 리스트 */}
      <div style={styles.list}>
        {items.length === 0 ? (
          <div style={styles.empty}>{isReviews ? "작성한 리뷰가 없습니다." : "작성한 댓글이 없습니다."}</div>
        ) : isReviews ? (
          items.map((r) => (
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
          ))
        ) : (
          items.map((c) => (
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
          ))
        )}
      </div>

      {/* 더보기 */}
      <div style={styles.moreWrap}>
        <button
          onClick={() => fetchMore(false)}
          disabled={loading || !hasNext}
          style={styles.moreBtn}
        >
          {loading ? "로딩..." : hasNext ? "더 보기" : "더 이상 없음"}
        </button>
      </div>
    </div>
  );
}

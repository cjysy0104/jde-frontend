import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { myActivityApi } from "../../../../utils/api";
import { styles } from "./myListStyles";
import CommentEditor from "../../Comment/CommentEditor";
import { commentApi } from "../../../../utils/commentApi"

export default function MyListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const listType = searchParams.get("type") ?? "review"; // "review" | "comment"
  const isReviewList = useMemo(() => listType === "review", [listType]);

  const pageSize = 10;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [editingCommentNo, setEditingCommentNo] = useState(null);
  const [editingValue, setEditingValue] = useState("");


  const isRequestInFlightRef = useRef(false);
  const requestSequenceRef = useRef(0);

  const normalizeResponseList = (apiResponse) => {
    const payload = apiResponse?.data ?? apiResponse;

    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.result)) return payload.result;
    if (Array.isArray(payload?.data)) return payload.data;

    const list = payload?.result?.list ?? payload?.data?.list ?? payload?.list ?? payload?.items ?? payload?.content;
    return Array.isArray(list) ? list : [];
  };

  const cutTextTo20Chars = (text) => {
    if (!text) return "내용 없음";
    return text.length > 20 ? text.slice(0, 20) + "…" : text;
  };

  const formatValueOrDash = (value) => (value ? String(value) : "-");

  const fetchPageByIndex = useCallback(
    async (targetPageIndex) => {
      if (isRequestInFlightRef.current) return;

      isRequestInFlightRef.current = true;
      setIsLoading(true);

      const requestId = ++requestSequenceRef.current;

      try {
        const cursorForBackend = targetPageIndex + 1;

        const apiResponse = isReviewList
          ? await myActivityApi.getMyReviews({ size: pageSize + 1, cursor: cursorForBackend })
          : await myActivityApi.getMyComments({ size: pageSize + 1, cursor: cursorForBackend });

        const fullList = normalizeResponseList(apiResponse);

        if (requestId !== requestSequenceRef.current) return;

        const nextPageExists = fullList.length > pageSize;
        const slicedList = nextPageExists ? fullList.slice(0, pageSize) : fullList;

        setItems(slicedList);
        setHasNextPage(nextPageExists);
        setCurrentPageIndex(targetPageIndex);
      } catch (error) {
        alert("내 리뷰/댓글 조회 실패");
        setItems([]);
        setHasNextPage(false);
      } finally {
        if (requestId === requestSequenceRef.current) setIsLoading(false);
        isRequestInFlightRef.current = false;
      }
    },
    [isReviewList]
  );

  useEffect(() => {
    requestSequenceRef.current++;
    isRequestInFlightRef.current = false;

    setItems([]);
    setCurrentPageIndex(0);
    setHasNextPage(true);

    setEditingCommentNo(null);
    setEditingValue("");

    fetchPageByIndex(0);
  }, [listType, fetchPageByIndex]);

  const handleDeleteReview = async (reviewNumber) => {
    if (!window.confirm("리뷰를 삭제할까요?")) return;

    try {
      await myActivityApi.deleteReview(reviewNumber);
      await fetchPageByIndex(currentPageIndex);
      alert("삭제 완료");
    } catch (error) {
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  const handleDeleteComment = async (commentNumber) => {
    if (!window.confirm("댓글을 삭제할까요?")) return;

    try {
      await commentApi.deleteCommentById({ commentNo: commentNumber });
      await fetchPageByIndex(currentPageIndex);
      alert("삭제 완료");
    } catch (error) {
      alert("삭제 실패 (권한/로그인 확인)");
    }
  };

  const startEditComment = (commentItem) => {
  const commentNumber = commentItem.commentNo ?? commentItem.commentId ?? commentItem.id;
  if (!commentNumber) return alert("댓글 번호가 없습니다.");

  setEditingCommentNo(commentNumber);
  setEditingValue(commentItem.content ?? "");
};

const cancelEditComment = () => {
  setEditingCommentNo(null);
  setEditingValue("");
};

const saveEditComment = async () => {
  const v = editingValue.trim();
  if (!v) return alert("내용을 입력해 주세요.");

  try {

    await commentApi.updateComment({ commentNo: editingCommentNo, content: v });

    await fetchPageByIndex(currentPageIndex);
    alert("수정 완료");
    cancelEditComment();
  } catch (e) {
    alert("수정 실패 (권한/로그인/API 확인)");
  }
};


  const goToEditReviewPage = (reviewNumber) => {
  if (!reviewNumber) return alert("리뷰 번호가 없습니다.");
  navigate(`/reviews/update/${reviewNumber}`);
  };
  const goToEditCommentPage = (reviewNumber, commentNumber) => {
  if (!commentNumber) return alert("댓글 번호가 없습니다.");
  if (!reviewNumber) return alert("리뷰 번호가 없습니다.");
  navigate(`/reviews/${reviewNumber}`, { state: { editCommentNo: commentNumber }});
  };

  const visiblePageCount = 5;
  const pageStartIndex = Math.max(0, currentPageIndex - 2);

  const pageIndexList = [];
  for (let i = 0; i < visiblePageCount; i++) {
    pageIndexList.push(pageStartIndex + i);
  }

  const pageIndexListTrimmed = hasNextPage
    ? pageIndexList
    : pageIndexList.filter((pageIndex) => pageIndex <= currentPageIndex);

  const goToPreviousPage = () => currentPageIndex > 0 && fetchPageByIndex(currentPageIndex - 1);
  const goToNextPage = () => hasNextPage && fetchPageByIndex(currentPageIndex + 1);
  const goToPageIndex = (pageIndex) => fetchPageByIndex(pageIndex);

  return (
    <div>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>내 리뷰/댓글</h2>

        <div style={styles.tabGroup}>
          <button
            onClick={() => setSearchParams({ type: "review" })}
            style={styles.pillBtn(listType === "review")}
          >
            리뷰
          </button>
          <button
            onClick={() => setSearchParams({ type: "comment" })}
            style={styles.pillBtn(listType === "comment")}
          >
            댓글
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={styles.empty}>{isLoading ? "로딩중..." : "목록이 없습니다."}</div>
      ) : isReviewList ? (
        <div style={styles.list}>
          {items.map((reviewItem, index) => {
            const reviewNumber = reviewItem.reviewNo ?? reviewItem.reviewId ?? reviewItem.id;
            const reviewKey = reviewNumber != null ? `review-${reviewNumber}` : `review-index-${index}`;

            const createdDate = formatValueOrDash(reviewItem.createDate);
            const updatedDate = formatValueOrDash(reviewItem.updateDate);

            return (
              <div key={reviewKey} style={styles.reviewCard}>
                <div style={styles.reviewThumbWrap}>
                  {reviewItem.thumbnailUrl ? (
                    <img src={reviewItem.thumbnailUrl} alt="thumbnail" style={styles.reviewThumbImg} />
                  ) : (
                    <div style={styles.reviewThumbFallback}>썸네일</div>
                  )}
                </div>

                <div style={styles.reviewBlackArea}>
                  <div style={styles.reviewHeadline}>{cutTextTo20Chars(reviewItem.content)}</div>
                  <div style={styles.reviewShopName}>{reviewItem.restaurantName ?? "가게명"}</div>

                  <div style={styles.reviewMetaRow}>
                    <span style={styles.reviewMetaChip}>⭐ {reviewItem.rating ?? 0}</span>
                    <span style={styles.reviewMetaChip}>👍 {reviewItem.likeCount ?? 0}</span>
                    <span style={styles.reviewMetaChip}>💬 {reviewItem.commentCount ?? 0}</span>
                    <span style={styles.reviewMetaChip}>👁 {reviewItem.viewCount ?? 0}</span>
                  </div>

                  <div style={styles.reviewDates}>
                    <div>작성일: {createdDate}</div>
                    <div>업데이트: {updatedDate}</div>
                  </div>
                </div>

                <div style={styles.reviewActionCol}>
                  <button onClick={() => goToEditReviewPage(reviewNumber)} style={styles.btnDark}>
                    수정
                  </button>
                  <button onClick={() => handleDeleteReview(reviewNumber)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.list}>
          {items.map((commentItem, index) => {
            const commentNumber = commentItem.commentNo ?? commentItem.commentId ?? commentItem.id;
            const commentKey = commentNumber != null ? `comment-${commentNumber}` : `comment-index-${index}`;

            const reviewNumber = commentItem.reviewNo ?? commentItem.reviewId;
            const createdDate = formatValueOrDash(commentItem.commentDate);
            const headline = cutTextTo20Chars(commentItem.reviewContentPreview || commentItem.content);

            return (
              <div key={commentKey} style={styles.commentCard}>
                <div style={styles.commentBody}>
                  <div style={styles.commentHeadline}>{headline}</div>

                  <div style={styles.commentMetaRow}>
                    <span style={styles.commentMetaText}>👍 {commentItem.likeCount ?? 0}</span>
                    <span style={styles.dot}>·</span>
                    <span style={styles.commentMetaText}>작성일 {createdDate}</span>
                  </div>

                  {editingCommentNo === commentNumber ? (
                    <CommentEditor
                      value={editingValue}
                      onChange={setEditingValue}
                      onSave={saveEditComment}
                      onCancel={cancelEditComment}
                      maxLength={500}
                    />
                  ) : (
                    <div style={styles.commentContent}>{commentItem.content}</div>
                  )}
                </div>

                <div style={styles.commentActionCol}>
                  <a href={`/reviews/${reviewNumber ?? ""}`} style={styles.btnOutline}>
                    리뷰로
                  </a>
                  <button onClick={() => startEditComment(commentItem)} style={styles.btnDark} disabled={isLoading}>
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(commentNumber)} style={styles.btnDanger}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={styles.pagerWrap}>
        <button
          disabled={currentPageIndex === 0 || isLoading}
          onClick={goToPreviousPage}
          style={styles.pagerNavBtn(currentPageIndex === 0 || isLoading)}
        >
          이전
        </button>

        {pageIndexListTrimmed.map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => goToPageIndex(pageIndex)}
            style={styles.pagerBtn(pageIndex === currentPageIndex)}
            disabled={isLoading}
          >
            {pageIndex + 1}
          </button>
        ))}

        <button
          disabled={!hasNextPage || isLoading}
          onClick={goToNextPage}
          style={styles.pagerNavBtn(!hasNextPage || isLoading)}
        >
          다음
        </button>
      </div>
    </div>
  );
}

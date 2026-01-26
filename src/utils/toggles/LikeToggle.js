import { useCallback, useEffect, useRef } from "react";
import { reviewApi } from "../api";

/**
 * 공통 좋아요 토글 훅
 * - 낙관적 업데이트 + 실패 롤백 포함
 */
export function useLikeToggle({
  items,
  setItems,
  keyField = "reviewNo",
  likedField = "isLiked",
  yesValue = "Y",
  noValue = "N",
  countField = "likeCount",
  apiLike = (id) => reviewApi.likeReview(id),
  apiUnlike = (id) => reviewApi.unlikeReview(id),
  errorMessage = "좋아요 처리에 실패했습니다.",
}) {
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  return useCallback(
    async (id) => {
      if (!id) return;

      const current = itemsRef.current || [];
      const target = current.find((x) => x?.[keyField] === id);
      const prevLiked = target?.[likedField] === yesValue;
      const prevCount = Number(target?.[countField] ?? 0);

      const nextLiked = !prevLiked;
      const nextCount = nextLiked ? prevCount + 1 : Math.max(0, prevCount - 1);

      // optimistic update
      setItems((prev) =>
        prev.map((x) =>
          x?.[keyField] === id
            ? {
                ...x,
                [likedField]: nextLiked ? yesValue : noValue,
                [countField]: nextCount,
              }
            : x
        )
      );

      try {
        if (nextLiked) await apiLike(id);
        else await apiUnlike(id);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.result?.message ||
          e?.message ||
          "";

        // 서버 메시지에 따라 상태 고정(선택)
        if (msg.includes("이미 좋아요")) {
          setItems((prev) =>
            prev.map((x) =>
              x?.[keyField] === id ? { ...x, [likedField]: yesValue } : x
            )
          );
          return;
        }

        if (msg.includes("좋아요를 누르지 않은")) {
          setItems((prev) =>
            prev.map((x) =>
              x?.[keyField] === id ? { ...x, [likedField]: noValue } : x
            )
          );
          return;
        }

        // rollback
        setItems((prev) =>
          prev.map((x) =>
            x?.[keyField] === id
              ? {
                  ...x,
                  [likedField]: prevLiked ? yesValue : noValue,
                  [countField]: prevCount,
                }
              : x
          )
        );

        alert(msg || errorMessage);
      }
    },
    [
      keyField,
      likedField,
      yesValue,
      noValue,
      countField,
      apiLike,
      apiUnlike,
      errorMessage,
      setItems,
    ]
  );
}

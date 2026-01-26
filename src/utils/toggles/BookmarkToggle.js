import { useCallback, useEffect, useRef } from "react";
import { bookmarkApi } from "../api";

/**
 * 공통 북마크 토글 훅
 * - items(setter)만 넘기면, 리스트/상세/북마크페이지 어디서든 재사용 가능
 */
export function useBookmarkToggle({
  items,
  setItems,
  keyField = "reviewNo",
  flagField = "isMarked",
  onValue = "Y",
  offValue = "N",
  removeWhenOff = false, // 북마크 페이지처럼 "해제하면 목록에서 제거"할 때 true
  confirmWhenOff = false,
  confirmMessage = "정말 해제하시겠습니까?",
  apiToggle = (id) => bookmarkApi.toggle(id),
  errorMessage = "북마크 처리에 실패했습니다.",
}) {
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const isOn = useCallback(
    (v) => v === onValue,
    [onValue]
  );

  return useCallback(
    async (id) => {
      if (!id) return;

      const current = itemsRef.current || [];
      const idx = current.findIndex((x) => x?.[keyField] === id);
      const target = idx >= 0 ? current[idx] : null;
      const prevFlag = target?.[flagField];
      const prevOn = isOn(prevFlag);
      const nextFlag = prevOn ? offValue : onValue;

      if (confirmWhenOff && prevOn) {
        const ok = window.confirm(confirmMessage);
        if (!ok) return;
      }

      // optimistic update
      if (removeWhenOff && prevOn) {
        setItems((prev) => prev.filter((x) => x?.[keyField] !== id));
      } else {
        setItems((prev) =>
          prev.map((x) =>
            x?.[keyField] === id ? { ...x, [flagField]: nextFlag } : x
          )
        );
      }

      try {
        await apiToggle(id);
      } catch (e) {
        console.error(e);

        // rollback
        if (removeWhenOff && prevOn && target) {
          setItems((prev) => {
            if (prev.some((x) => x?.[keyField] === id)) return prev;
            const copy = [...prev];
            const insertAt = Math.min(Math.max(idx, 0), copy.length);
            copy.splice(insertAt, 0, target);
            return copy;
          });
        } else {
          setItems((prev) =>
            prev.map((x) =>
              x?.[keyField] === id ? { ...x, [flagField]: prevFlag } : x
            )
          );
        }

        alert(errorMessage);
      }
    },
    [
      keyField,
      flagField,
      offValue,
      onValue,
      removeWhenOff,
      confirmWhenOff,
      confirmMessage,
      apiToggle,
      errorMessage,
      isOn,
      setItems,
    ]
  );
}

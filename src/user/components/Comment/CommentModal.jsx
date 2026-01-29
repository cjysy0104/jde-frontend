import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import * as S from "./CommentModal.styled";

const CommentModal = ({ open, title = "댓글", onClose, children }) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);

    // 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose} aria-label="닫기">
            ✕
          </S.CloseButton>
        </S.Header>
        <S.Body>{children}</S.Body>
      </S.Modal>
    </S.Overlay>,
    document.body
  );
};

export default CommentModal;

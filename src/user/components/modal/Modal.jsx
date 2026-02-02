import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Overlay,
  Dialog,
  Header,
  Title,
  CloseButton,
  Body,
  Footer,
  GhostBtn,
  PrimaryBtn,
} from "./Modal.styles";

export default function Modal({
  title,
  children,
  onClose,
  primaryText = "확인",
  cancelText = "취소",
  onPrimary,
  maxWidth,
}) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <Overlay
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <Dialog $maxWidth={maxWidth}>
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose} aria-label="닫기">
            ✕
          </CloseButton>
        </Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPrimary?.();
          }}
        >
          <Body>{children}</Body>

          <Footer>
            {cancelText && (
              <GhostBtn type="button" onClick={onClose}>
                {cancelText}
              </GhostBtn>
            )}
            <PrimaryBtn type="submit">{primaryText}</PrimaryBtn>
          </Footer>
        </form>
      </Dialog>
    </Overlay>,
    document.body
  );
}

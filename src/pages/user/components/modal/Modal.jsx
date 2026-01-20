import React, { useEffect } from "react";


export default function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="m-overlay" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="m-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="m-header">
          <div className="m-title">{title}</div>
          <button className="btn-ghost" onClick={onClose} type="button">✕</button>
        </div>
        <div className="m-body">{children}</div>
      </div>
    </div>
  );
}

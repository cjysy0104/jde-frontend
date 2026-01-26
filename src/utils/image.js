import NotFoundImage from "../assets/NotFoundImage.jpg";

/**
 * 이미지 공통 props 반환
 * - src 없으면 default 이미지
 * - 로딩 실패 시 default 이미지로 fallback
 */
export const getImageProps = (src) => ({
  src: src || NotFoundImage,
  loading: "lazy",
  decoding: "async",
  onError: (e) => {
    // 무한 루프 방지
    if (e.currentTarget.src.includes("NotFoundImage")) return;

    e.currentTarget.onerror = null;
    e.currentTarget.src = NotFoundImage;
  },
});

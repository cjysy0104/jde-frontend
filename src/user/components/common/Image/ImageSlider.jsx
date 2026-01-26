import React, { useEffect, useMemo, useState } from "react";
import * as S from "./ImageSlider.styled";

const ImageSlider = ({ files = [], height = 360 }) => {
  const images = useMemo(() => files ?? [], [files]);
  const [current, setCurrent] = useState(0);

  // 이미지 목록이 바뀌면 첫 장으로
  useEffect(() => {
    setCurrent(0);
  }, [images.length]);

  if (!images.length) {
    return <S.NoImage style={{ height }}>이미지가 없습니다.</S.NoImage>;
  }

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <S.Slider>
      <S.Viewport>
        <S.Track $current={current}>
          {images.map((file) => (
            <S.Slide key={file.fileNo}>
              <S.Image src={file.fileUrl} alt="음식 사진" style={{ height }} />
            </S.Slide>
          ))}
        </S.Track>
      </S.Viewport>

      {images.length > 1 && (
        <>
          <S.NavButton type="button" $left onClick={prev} aria-label="이전 이미지">
            ‹
          </S.NavButton>
          <S.NavButton type="button" onClick={next} aria-label="다음 이미지">
            ›
          </S.NavButton>

          <S.Dots>
            {images.map((_, idx) => (
              <S.Dot
                key={idx}
                type="button"
                $active={idx === current}
                onClick={() => setCurrent(idx)}
                aria-label={`${idx + 1}번째 이미지로 이동`}
              />
            ))}
          </S.Dots>
        </>
      )}
    </S.Slider>
  );
};

export default ImageSlider;

import styled from "styled-components";

export const Slider = styled.div`
  position: relative;
  width: 100%;
`;

export const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
`;

export const Track = styled.div`
  display: flex;
  transform: translateX(${(p) => `-${p.$current * 100}%`});
  transition: transform 300ms ease;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(p) => (p.$left ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

export const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

export const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${(p) =>
    p.$active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"};
`;

export const NoImage = styled.div`
  width: 100%;
  border-radius: 12px;
  background: #f3f3f3;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
`;

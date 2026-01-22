import styled, { keyframes } from "styled-components";

const pop = keyframes`
  from { transform: translateY(10px) scale(0.98); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 18px;
`;

export const Dialog = styled.div`
  width: min(${({ $maxWidth }) => $maxWidth || 560}px, 100%);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
  overflow: hidden;
  animation: ${pop} 160ms ease-out;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Title = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #111827;
  letter-spacing: -0.2px;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #111827;
  padding: 6px 10px;
  border-radius: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const Body = styled.div`
  padding: 16px;
`;

export const Footer = styled.div`
  padding: 14px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const GhostBtn = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  cursor: pointer;
  font-weight: 700;
  color: #111827;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

export const PrimaryBtn = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: none;
  background: #111827;
  cursor: pointer;
  font-weight: 800;
  color: #fff;

  &:hover {
    background: #0b1220;
  }
`;

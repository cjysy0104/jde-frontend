import styled from "styled-components";

/* ===== 공통 레이아웃 ===== */
export const Page = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 24px;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 900;
  color: #111827;
`;

/* ===== 기본 정보 Row ===== */
export const Row = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: #6b7280;
`;

export const Value = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Btn = styled.button`
  border: 1px solid #e5e7eb;
  background: white;
  padding: 9px 12px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
`;

/* (기존 코드에서 쓰고 있던 것들 – 필요하면 유지) */
export const AvatarWrap = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* ===== MyProfilePage 전용 스타일들 (기존 MyProfilePage.styles.js 역할) ===== */
export const BigAvatarWrap = styled.div`
  margin: 14px 0 6px;
  position: relative;
  width: fit-content;
`;

export const BigAvatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
`;

export const Badge = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.85);
  color: white;
  font-weight: 800;
  font-size: 12px;
`;

export const ActionRow = styled.div`
  margin: 10px 0 18px;
  display: flex;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  border: 1px solid #111827;
  background: #111827;
  color: white;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ModalDesc = styled.p`
  margin: 0 0 10px;
  color: #111827;
  font-weight: 700;
  line-height: 1.4;
`;

export const ModalInput = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 12px;
  font-weight: 800;
  outline: none;

  &:focus {
    border-color: #111827;
  }
`;

export const Hint = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
`;

export const Split = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  padding: 14px;
`;

export const CardTitle = styled.div`
  font-weight: 900;
  color: #111827;
  margin-bottom: 10px;
`;

export const CardRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const HiddenFileInput = styled.input``;

export const GhostButton = styled.button`
  border: 1px solid #e5e7eb;
  background: white;
  padding: 9px 10px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
`;

export const FileName = styled.div`
  flex: 1;
  min-width: 0;
  font-weight: 800;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PreviewBox = styled.div`
  margin-top: 10px;
  border: 1px dashed #e5e7eb;
  border-radius: 14px;
  background: #f9fafb;
  min-height: 220px;
  height: auto;
  display: grid;
  place-items: center;
  overflow: visible;
  padding: 12px;
`;

export const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 320px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  background: #f9fafb;
`;

export const PreviewPlaceholder = styled.div`
  font-weight: 900;
  color: #9ca3af;
`;

export const CardActions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const MiniPrimary = styled.button`
  border: 1px solid #111827;
  background: #111827;
  color: white;
  padding: 8px 10px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Thumb = styled.button`
  border: 1px solid ${({ $active }) => ($active ? "#111827" : "#e5e7eb")};
  background: ${({ $active }) => ($active ? "#111827" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#111827")};
  border-radius: 14px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
`;

export const ThumbImg = styled.img`
  width: 100%;
  height: 90px;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
`;

export const ThumbMeta = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-weight: 900;

  span {
    font-size: 13px;
  }

  small {
    font-size: 12px;
    opacity: 0.8;
  }
`;

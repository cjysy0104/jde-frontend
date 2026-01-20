import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 18px 0;
  color: #111827;
`;

export const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const AvatarImg = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 90px;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  border-top: 1px solid #f3f4f6;
`;

export const Label = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: #6b7280;
`;

export const Value = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #111827;
`;

export const Btn = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  background: #f97316;
  color: white;
  border: none;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: #ea580c;
  }
`;

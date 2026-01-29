// src/admin/components/RankingManagement/styles.js
import styled from "styled-components";

export const PageWrap = styled.div`
  padding: 24px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.2px;
`;

export const SubTitle = styled.p`
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 13px;
`;

export const RefreshButton = styled.button`
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.04s ease, background 0.15s ease;

  &:hover:enabled {
    background: #f9fafb;
  }

  &:active:enabled {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Card = styled.div`
  grid-column: span 6;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);

  @media (max-width: 1024px) {
    grid-column: span 8;
  }
  @media (max-width: 720px) {
    grid-column: span 4;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;

  color: ${(p) => (p.$active ? "#065f46" : "#6b7280")};
  background: ${(p) => (p.$active ? "#d1fae5" : "#f3f4f6")};
  border: 1px solid ${(p) => (p.$active ? "#a7f3d0" : "#e5e7eb")};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eef2f7;
  margin: 12px 0;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  padding: 6px 0;

  @media (max-width: 720px) {
    grid-template-columns: 90px 1fr;
  }
`;

export const Label = styled.div`
  color: #6b7280;
  font-size: 12px;
  font-weight: 800;
`;

export const Value = styled.div`
  color: #111827;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
`;

export const MutedText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 13px;
`;

export const DangerText = styled.div`
  margin: 10px 0 14px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #b91c1c;
  font-weight: 800;
  font-size: 13px;
`;

export const EmptyState = styled.div`
  padding: 18px 14px;
  border: 1px dashed #d1d5db;
  border-radius: 14px;
  background: #fafafa;
  margin-top: 8px;
`;

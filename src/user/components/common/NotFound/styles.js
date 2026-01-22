import styled from "styled-components";

export const NotFoundContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  background-color: #fafafa;
`;

export const ContentBox = styled.div`
  text-align: center;
  background-color: white;
  padding: 28px 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  max-width: 420px;
  width: 100%;
`;

export const ErrorCode = styled.div`
  font-size: 72px;
  font-weight: 800;
  color: #f97316;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const BackButton = styled.button`
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
`;

export const HomeButton = styled.button`
  padding: 12px 22px;
  border-radius: 10px;
  border: none;
  background-color: #f97316;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ea580c;
  }
`;

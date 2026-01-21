import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 20px 0;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

export const LogoText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AuthButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
`;

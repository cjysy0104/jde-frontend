import styled from 'styled-components';

export const AvatarListContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const AvatarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const AvatarImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarName = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

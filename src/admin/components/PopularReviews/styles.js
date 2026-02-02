import styled from 'styled-components';

export const ReviewsContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ReviewsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ReviewImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ReviewContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ReviewTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const ReviewSubtitle = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const ReviewAuthor = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

export const AllProductsButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f3f4f6;
  color: #111827;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e5e7eb;
  }
`;

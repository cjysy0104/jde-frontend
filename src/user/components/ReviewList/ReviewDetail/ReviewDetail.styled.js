import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  background: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightSection = styled.div`
  flex: 1;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const StarRating = styled.div`
  display: flex;
  gap: 4px;
  font-size: 24px;
`;

export const Star = styled.span`
  color: ${({ $filled }) => ($filled ? "#FFD700" : "#DDD")};
`;

export const ReviewText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  white-space: pre-line;
  margin: 0;
`;

export const InfoSection = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: 400;
`;

export const Value = styled.span`
  font-size: 18px;
  color: #000;
  font-weight: 600;
`;

export const FoodImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const LoadingContainer = styled.div`
  width: 100%;
  padding: 60px 20px;
  text-align: center;
  font-size: 18px;
  color: #666;
`;

export const ErrorContainer = styled.div`
  width: 100%;
  padding: 60px 20px;
  text-align: center;
  font-size: 18px;
  color: #e74c3c;
`;

export const MapSection = styled.div`
  margin-top: 24px;
  background: white;
  border-radius: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const BackButton = styled(BaseButton)`
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
  }
`;

export const EditButton = styled(BaseButton)`
  background-color: #FF6B35;
  color: white;

  &:hover {
    background-color: #e85a28;
  }
`;

export const DeleteButton = styled(BaseButton)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

export const ReportButton = styled(BaseButton)`
  background-color: #ffc107;
  color: #333;

  &:hover {
    background-color: #e0a800;
  }
`;
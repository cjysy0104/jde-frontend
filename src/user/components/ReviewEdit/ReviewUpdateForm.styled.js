import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const FormTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

export const SectionWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #ff6b35;
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

export const SubmitButton = styled.button`
  padding: 14px 48px;
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e55a28;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 14px 48px;
  background-color: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
`;
import styled from 'styled-components';

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #ff6b35;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const SearchButton = styled.button`
  margin-top: 8px;
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #e8e8e8;
  }
`;
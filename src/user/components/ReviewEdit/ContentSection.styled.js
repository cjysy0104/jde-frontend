import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  line-height: 1.6;
  
  &:focus {
    border-color: #ff6b35;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

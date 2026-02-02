import styled from 'styled-components';

export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const KeywordButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.selected ? '#ff6b35' : 'white'};
  color: ${props => props.selected ? 'white' : '#666'};
  border: 1px solid ${props => props.selected ? '#ff6b35' : '#ddd'};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #ff6b35;
    background-color: ${props => props.selected ? '#e55a28' : '#fff5f2'};
  }
`;
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  gap: 24px;
`;

export const SearchInput = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
  display: flex;
  align-items: center;
  
  input {
    width: 100%;
    padding: 10px 16px 10px 44px;
    border: 1px solid #e5e7eb;
    border-radius: 24px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    
    &:focus {
      border-color: #3b82f6;
    }
    
    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #9ca3af;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #6b7280;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

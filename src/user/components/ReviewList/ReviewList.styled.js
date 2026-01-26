import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fafafa;
  min-height: 100vh;
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

export const SearchBar = styled.div`
  flex: 1;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #ff6b35;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

export const SortDropdown = styled.div`
  select {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    outline: none;
    background-color: white;
    
    &:focus {
      border-color: #ff6b35;
    }
  }
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ff6b35;
  border: none;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(255, 107, 53, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const PlusIcon = styled.span`
  font-size: 32px;
  color: white;
  font-weight: 300;
  line-height: 1;
`;
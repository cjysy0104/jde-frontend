import styled from 'styled-components';

export const SearchSectionContainer = styled.section`
  width: 100%;
  padding: 60px 24px;
  background-color: white;
`;

export const SearchContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const TitleSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MainTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #f97316;
  margin: 0;
`;

export const SearchBox = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px 60px 16px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #f97316;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  width: 44px;
  height: 44px;
  background-color: #f97316;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ea580c;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;

  background-color: ${(props) => (props.$active ? "#f97316" : "white")};
  color: ${(props) => (props.$active ? "white" : "#111827")};
  border: 1px solid ${(props) => (props.$active ? "#f97316" : "#e5e7eb")};

  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? "#ea580c" : "#f9fafb")};
    border-color: ${(props) => (props.$active ? "#ea580c" : "#d1d5db")};
  }

  svg {
    font-size: 14px;
  }
`;

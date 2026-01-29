import styled from "styled-components";

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
  gap: 12px;
  margin-bottom: 30px;
  background-color: #fff;
  padding: 18px 20px;
  border-radius: 10px;
  border: 1px solid #eee;
`;

export const SearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 14px;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #ff6b35;
  }
`;

export const SearchIconButton = styled.button`
  height: 42px;
  min-width: 42px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: #fff;
  color: #666;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const FilterButton = styled.button`
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: #fff;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SortDropdown = styled.div`
  select {
    height: 42px;
    padding: 0 14px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 13px;
    cursor: pointer;
    outline: none;
    background-color: #fff;

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
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(255, 107, 53, 0.5);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const PlusIcon = styled.span`
  font-size: 32px;
  color: #fff;
  font-weight: 300;
  line-height: 1;
`;

export const CaptainHeader = styled.div`
  margin-bottom: 30px;
  background-color: #fff;
  padding: 18px 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const CaptainHeaderTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #222;
`;

export const CaptainNickname = styled.span`
  color: #ff6b35;
  font-weight: 800;
`;

export const CaptainHeaderSub = styled.span`
  color: #666;
  font-weight: 600;
  margin-left: 2px;
`;

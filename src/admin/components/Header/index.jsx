import React, { useState } from 'react';
import { FaSearch, FaPlus, FaBell, FaEdit } from 'react-icons/fa';
import {
  HeaderContainer,
  SearchInput,
  SearchIcon,
  RightSection,
  CreateButton,
  IconButton,
  Avatar,
} from './styles';

const Header = ({ searchPlaceholder, onSearch, searchKeyword = '' }) => {
  const [searchValue, setSearchValue] = useState(searchKeyword);

  // 부모의 searchKeyword가 변경되면 (페이지 변경 등) input도 초기화
  React.useEffect(() => {
    setSearchValue(searchKeyword);
  }, [searchKeyword]);

  // Enter 키 또는 검색 아이콘 클릭 시 검색 실행
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (onSearch) {
        onSearch(searchValue);
      }
    }
  };

  // 입력값 변경
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <HeaderContainer>
      <SearchInput>
        <SearchIcon onClick={handleSearch}><FaSearch /></SearchIcon>
        <input
          type="text"
          placeholder={searchPlaceholder || "Search or type a command"}
          value={searchValue}
          onChange={handleChange}
          onKeyPress={handleSearch}
        />
      </SearchInput>
      
      <RightSection>
        <CreateButton>
          <FaPlus />
          Create
        </CreateButton>
        <IconButton>
          <FaBell />
        </IconButton>
        <IconButton>
          <FaEdit />
        </IconButton>
        <Avatar>
          <img 
            src="https://via.placeholder.com/40" 
            alt="User" 
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTIwIDEyQzIyLjIwOTEgMTIgMjQgMTMuNzkwOSAyNCAxNkMyNCAxOC4yMDkxIDIyLjIwOTEgMjAgMjAgMjBDMTcuNzkwOSAyMCAxNiAxOC4yMDkxIDE2IDE2QzE2IDEzLjc5MDkgMTcuNzkwOSAxMiAyMCAxMloiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTIwIDIyQzE1LjU4MTcgMjIgMTEuODQxNyAyNC4yMTQzIDEwIDI3LjQ3NDlWMjJIMzBWMjcuNDc0OUMyOC4xNTgzIDI0LjIxNDMgMjQuNDE4MyAyMiAyMCAyMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
            }}
          />
        </Avatar>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

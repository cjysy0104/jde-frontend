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

const Header = ({ searchPlaceholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (onSearch) {
        onSearch(searchValue);
      }
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // 실시간 검색이 필요한 경우 주석 해제
    // if (onSearch) {
    //   onSearch(e.target.value);
    // }
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
          <img src="https://via.placeholder.com/40" alt="User" />
        </Avatar>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

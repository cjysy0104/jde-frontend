import React, { useState } from 'react';
import { FaSearch, FaUtensils, FaLightbulb, FaChair, FaFlag } from 'react-icons/fa';
import {
  SearchSectionContainer,
  SearchContent,
  TitleSection,
  MainTitle,
  SubTitle,
  SearchBox,
  SearchInput,
  SearchButton,
  FilterContainer,
  FilterButton,
} from './styles';

const SearchSection = () => {
  const [activeFilter, setActiveFilter] = useState('전체');

  const filters = [
    { id: '전체', icon: null },
    { id: '혼밥', icon: FaUtensils },
    { id: '신선한', icon: FaLightbulb },
    { id: '단체석', icon: FaChair },
    { id: '신규', icon: FaFlag },
  ];

  return (
    <SearchSectionContainer>
      <SearchContent>
        <TitleSection>
          <MainTitle>맛집을 찾아보세요</MainTitle>
          <SubTitle>Just Do Eat!</SubTitle>
        </TitleSection>
        
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="종로구 맛집, 리뷰가 많은 맛집 등..."
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchBox>
        
        <FilterContainer>
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <FilterButton
                key={filter.id}
                $active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {Icon && <Icon />}
                {filter.id}
              </FilterButton>
            );
          })}
        </FilterContainer>
      </SearchContent>
    </SearchSectionContainer>
  );
};

export default SearchSection;
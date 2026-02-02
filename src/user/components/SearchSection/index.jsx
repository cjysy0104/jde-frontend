import React, { useState } from "react";
import { FaSearch, FaUtensils, FaLightbulb, FaChair, FaFlag } from "react-icons/fa";
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
} from "./styles";

const SearchSection = ({ 
  keywordNo, 
  setKeywordNo, 
  query, 
  setQuery,
  onSubmit
  }) => {

  const filters = [
    { id: "전체", icon: null, keywordNo: null },
    { id: "맛있어요", icon: FaLightbulb, keywordNo: 1 },
    { id: "친절해요", icon: FaUtensils, keywordNo: 2 },
    { id: "가성비", icon: FaFlag, keywordNo: 3 },
    { id: "분위기좋아요", icon: FaChair, keywordNo: 4 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <SearchSectionContainer>
      <SearchContent>
        <TitleSection>
          <MainTitle>맛집을 찾아보세요</MainTitle>
          <SubTitle>Just Do Eat!</SubTitle>
        </TitleSection>

          <form onSubmit={handleSubmit}>
            <SearchBox>
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="종로구 맛집, 리뷰가 많은 맛집 등..."
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </SearchBox>
          </form>

        <FilterContainer>
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <FilterButton
                key={filter.id}
                $active={keywordNo === filter.keywordNo}
                onClick={() => setKeywordNo(filter.keywordNo)}
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

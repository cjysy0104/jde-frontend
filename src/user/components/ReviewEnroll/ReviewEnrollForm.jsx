import React, { useState } from 'react';
import {
  FormContainer,
  FormTitle,
  SectionWrapper,
  SectionTitle,
  SubmitButtonWrapper,
  SubmitButton,
  CancelButton
} from './ReviewEnrollForm.styled';
import AddressSection from './AddressSection';
import RatingSection from './RatingSection';
import ContentSection from './ContentSection';
import FileSection from './FileSection';
import KeywordSection from './KeywordSection';
import RestaurantSearchModal from './RestaurantSearchModal'
import { kakaoMapApi } from '../../../utils/kakaoMapApi';
import { reviewApi } from '../../../utils/reviewApi';
import { useNavigate } from 'react-router';

const ReviewEnrollForm = () => {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    lat:'',
    lng:''
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // documents
  const [searchError, setSearchError] = useState(null);

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleRestaurantChange = (field, value) => {
    setRestaurant(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchRestaurant = async () => {
    if (!restaurant.name.trim()) {
      alert('식당명을 입력해주세요.');
      return;
    }

    setSearchError(null);
    setSearchLoading(true);

    try {
        const data = await kakaoMapApi.getAddressByQuery({query: restaurant.name});
        console.log(data.documents);
        setSearchResults(data.documents);
        setIsSearchOpen(true);
    } catch (error) {
        console.error(error);
        setSearchError('검색에 실패했습니다.');
        setSearchResults([]);
        setIsSearchOpen(true);
    } finally {
        setSearchLoading(false);
    }
  };

   const handleSelectRestaurant = (place) => {
    setRestaurant({
      name: place.place_name,
      address: place.road_address_name || place.address_name || '',
      lat: place.y,
      lng: place.x
    });
    setIsSearchOpen(false);
  };

  const handleKeywordToggle = (keyword) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!restaurant.name) {
      alert('식당을 선택해주세요.');
      return;
    }
    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('리뷰 내용을 작성해주세요.');
      return;
    }

    const latNum = Number(restaurant.lat);
    const lngNum = Number(restaurant.lng);

    // API 호출 - 제출
    const formData = new FormData();

    formData.append('content', content);
    formData.append('rating', String(rating));

    formData.append('normalName', restaurant.name);
    formData.append('address', restaurant.address);
    formData.append('latitude', String(latNum));
    formData.append('longitude', String(lngNum)); 
    
    selectedKeywords.forEach((no) => {
      formData.append('keywordNos', String(no));
    });

    files.forEach((f) => {
      formData.append('images', f.file);
    });

    for (const [k, v] of formData.entries()) {
  console.log("FD:", k, v);
}


    try {
        await reviewApi.createReview(formData);
        alert("리뷰가 등록되었습니다!");
        navigate("/reviews")
    } catch (e) {
        console.error(e);
        alert("리뷰 등록에 실패했습니다.");
        navigate("/reviews")
    }

  };

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      // 이전 페이지로 이동
      window.history.back();
    }
  };

  return (
    <>
    <FormContainer>
      <FormTitle>리뷰 작성</FormTitle>

      <SectionWrapper>
        <SectionTitle>리뷰 내용</SectionTitle>
        <ContentSection content={content} onContentChange={setContent} />
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>사진 첨부 (최대 5장)</SectionTitle>
        <FileSection files={files} onFilesChange={setFiles} />
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>별점</SectionTitle>
        <RatingSection rating={rating} onRatingChange={setRating} />
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>키워드 선택</SectionTitle>
        <KeywordSection
          selectedKeywords={selectedKeywords}
          onKeywordToggle={handleKeywordToggle}
        />
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>식당 정보</SectionTitle>
        <AddressSection
          restaurant={restaurant}
          onRestaurantChange={handleRestaurantChange}
          onSearchRestaurant={handleSearchRestaurant}
        />
      </SectionWrapper>

      <SubmitButtonWrapper>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </SubmitButtonWrapper>
    </FormContainer>

    <RestaurantSearchModal
        open={isSearchOpen}
        loading={searchLoading}
        error={searchError}
        results={searchResults}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleSelectRestaurant}
      />
    </>
    
  );
};

export default ReviewEnrollForm;
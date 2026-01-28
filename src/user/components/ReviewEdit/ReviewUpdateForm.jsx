import React, { useEffect, useState } from 'react';
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

const ReviewUpdateForm = ({reviewNo}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [review, setReview] = useState();
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    lat:'',
    lng:''
  });
  const [legacyFiles, setLegacyFiles] = useState([]);

  // Review 갖고오기
  useEffect(() => {
    const fetchReview = async () => {
        setLoading(true);
        try {
            const response = await reviewApi.getDetailReview(reviewNo);
            const data = response.data;
            console.log(data);
            setReview(data);
        } catch (error) {
            console.log("?", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    fetchReview();
  }, [reviewNo]);

  // 기존 데이터 값 주입
  useEffect(() => {
    if (!review) return;

    const r = review.data ?? review;

    setContent(r.content ?? "");
    setRating(Number(r.rating ?? 0));

    // 식당 정보
    setRestaurant({
        name: r.restaurant?.normalName ?? r.normalName ?? "",
        address: r.restaurant?.address ?? r.address ?? "",
        lat: r.restaurant?.latitude ?? r.latitude ?? "",
        lng: r.restaurant?.longitude ?? r.longitude ?? "",
    });

    // 키워드
    setSelectedKeywords((r.keywords ?? []).map(k => k.keywordNo));

    // 파일
    setFiles(r.files ?? []);
    setLegacyFiles(r.files ?? []);
  }, [review]);


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // documents
  const [searchError, setSearchError] = useState(null);

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

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
        await reviewApi.updateReview(reviewNo, formData);
        alert("리뷰가 수정되었습니다!");
        navigate("/reviews")
    } catch (e) {
        console.error(e);
        alert("리뷰 수정에 실패했습니다.");
        navigate("/reviews")
    }

  };

  const handleCancel = () => {
    if (window.confirm('수정을 취소하시겠습니까?')) {
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

      <SectionWrapper style={{ pointerEvents: "none", opacity: 0.7 }}>
        <SectionTitle>식당 정보</SectionTitle>
        <AddressSection
          restaurant={restaurant}
          onRestaurantChange={()=>{}}
          onSearchRestaurant={()=>{}}
          disabled={true}
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

export default ReviewUpdateForm;
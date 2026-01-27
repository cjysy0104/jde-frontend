import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useKakaoMapScript from '../../utils/map/useKakaoMapScript';
import KakaoMap from '../components/common/Map/KakaoMap';
import RestaurantCard from '../components/MapSearch/RestaurantCard';
import { restaurantApi } from '../../utils/restaurantApi';
import radiusIcon from '../../assets/radius-icon.png';
import {
  MapSearchContainer,
  LeftPanel,
  RightPanel,
  SearchBar,
  SearchInput,
  SearchIcon,
  ResultsHeader,
  ResultsCount,
  RestaurantList,
  MapContainer,
  LoadingMessage,
  EmptyMessage,
  LocationButton,
  MapControls,
  RadiusFilter,
  RadiusFilterTitle,
  RadiusIcon,
  RadiusButton,
  NearbyButton,
  NearbyIcon,
} from './MapSearchPage.styles';

const MapSearchPage = () => {
  const navigate = useNavigate();
  const ready = useKakaoMapScript();
  
  const [searchQuery, setSearchQuery] = useState('');
  // FIXME: 이름은 그대로 두지만 실제로는 Restaurant 리스트를 담는다
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  
  // 지도 상태
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 서울 기본값
  const [mapLevel, setMapLevel] = useState(5);
  const [markers, setMarkers] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  
  // 내 위치 관련 상태
  const [myLocation, setMyLocation] = useState(null);
  const [showNearby, setShowNearby] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [radius, setRadius] = useState(3); // 기본값 3km

  // 레스토랑 데이터 가져오기 (무한 스크롤)
  const fetchReviews = useCallback(async (append = false) => {
    if (loading || !hasNext) return;

    setLoading(true);
    try {
      const response = await restaurantApi.getRestaurantList({
        cursor,
        scrollSize: 20, // 한 번에 가져올 개수
      });

      let list = response?.data || [];

      // 백엔드에서 sizePlusOne 개를 보내므로, 실제 size보다 1개 많으면 다음 페이지가 있음
      const hasNextData = list.length > 20; // scrollSize(20) + 1 = 21개 이상이면 다음 페이지 있음
      
      // 다음 페이지 확인용으로 1개 더 받았으므로, 실제 표시할 개수만큼만 자름
      if (hasNextData) {
        list = list.slice(0, 20);
      }

      // RestaurantListDTO -> 프론트 공통 형태로 정규화
      // reviewNo가 없는 경우 restaurantNo를 reviewNo로 매핑해서 기존 로직 재사용
      list = list.map((item) => ({
        ...item,
        reviewNo: item.reviewNo ?? item.restaurantNo,
      }));
      
      setHasNext(hasNextData);

      if (append) {
        setReviews(prev => [...prev, ...list]);
      } else {
        setReviews(list);
      }

      if (list.length > 0) {
        const last = list[list.length - 1];
        // 커서는 레스토랑 번호 기준
        setCursor(last.restaurantNo ?? last.reviewNo);
      }
    } catch (error) {
      console.error('레스토랑 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasNext]);

  // 검색 실행
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setCursor(null);
      setHasNext(true);
      fetchReviews(false);
    }
  };

  // 좌표 기반으로 마커 생성 (Restaurant 기준, 검색/필터 결과에만)
  useEffect(() => {
    if (!ready) return;
    
    // 데이터가 없으면 마커 제거
    if (reviews.length === 0) {
      setMarkers([]);
      return;
    }

    // RestaurantListDTO 는 latitude / longitude 를 제공하므로
    // 우선 그 값을 사용하고, 없을 때만 주소 기반 geocoding 을 고려할 수 있다.
    const geocoder = new window.kakao.maps.services.Geocoder();

    const markerPromises = reviews.map((item) => {
      return new Promise((resolve) => {
        const base = {
          reviewNo: item.reviewNo,
          title: item.normalName || item.restaurantName,
          review: item,
        };

        // 1순위: DB 에 저장된 좌표 사용
        if (item.latitude != null && item.longitude != null) {
          resolve({
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            ...base,
          });
          return;
        }

        // 2순위: 좌표가 없으면 주소로 geocoding (기존 방식)
        if (!item.address) {
          resolve(null);
          return;
        }

        geocoder.addressSearch(item.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve({
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
              ...base,
            });
          } else {
            resolve(null);
          }
        });
      });
    });

    Promise.all(markerPromises).then((markerData) => {
      const validMarkers = markerData.filter(Boolean);
      setMarkers(validMarkers);

      // 첫 번째 마커로 지도 중심 이동 (반경 모드가 아닐 때만)
      if (validMarkers.length > 0 && !selectedReview && !showNearby) {
        setMapCenter({
          lat: validMarkers[0].lat,
          lng: validMarkers[0].lng,
        });
      }
    });
  }, [ready, reviews, selectedReview, showNearby, searchQuery]);

  // 마커 클릭 핸들러
  const handleMarkerClick = (markerData) => {
    const review = reviews.find(r => r.reviewNo === markerData.reviewNo);
    if (review) {
      setSelectedReview(review);
      setMapCenter({ lat: markerData.lat, lng: markerData.lng });
      setMapLevel(3);
      
      // 해당 카드로 스크롤
      const cardElement = document.getElementById(`restaurant-${review.reviewNo}`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = (review) => {
    setSelectedReview(review);
    const marker = markers.find(m => m.reviewNo === review.reviewNo);
    if (marker) {
      setMapCenter({ lat: marker.lat, lng: marker.lng });
      setMapLevel(3);
    }
  };

  // 지도 생성 콜백
  const handleMapCreated = (map) => {
    setMapInstance(map);
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (!ready) return;
    fetchReviews(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // 무한 스크롤 (LeftPanel 내부 스크롤)
  useEffect(() => {
    const restaurantList = document.querySelector('[data-restaurant-list]');
    if (!restaurantList) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = restaurantList;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasNext && !loading) {
        fetchReviews(true);
      }
    };

    restaurantList.addEventListener('scroll', handleScroll);
    return () => restaurantList.removeEventListener('scroll', handleScroll);
  }, [hasNext, loading, fetchReviews]);

  // 현재 위치 가져오기 및 토글
  const toggleNearbyView = () => {
    // 이미 활성화되어 있으면 해제
    if (showNearby) {
      setShowNearby(false);
      return;
    }

    // 위치 정보가 없으면 가져오기
    if (!myLocation) {
      if (!navigator.geolocation) {
        setLocationError('이 브라우저는 위치 정보를 지원하지 않습니다.');
        alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
        return;
      }

      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMyLocation(location);
          setMapCenter(location);
          setMapLevel(4);
          setShowNearby(true);
        },
        (error) => {
          console.error('위치 정보 가져오기 실패:', error);
          setLocationError('위치 정보를 가져올 수 없습니다.');
          alert('위치 정보 접근 권한이 필요합니다.');
        }
      );
    } else {
      // 위치 정보가 이미 있으면 바로 활성화
      setMapCenter(myLocation);
      setMapLevel(4);
      setShowNearby(true);
    }
  };

  // 두 좌표 간 거리 계산 (km)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // 지구 반경 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 주변 음식점 필터링 - 지도 마커용
  const getNearbyMarkers = () => {
    if (!myLocation || !showNearby) return markers;

    return markers.filter((marker) => {
      const distance = calculateDistance(
        myLocation.lat,
        myLocation.lng,
        marker.lat,
        marker.lng
      );
      return distance <= radius;
    });
  };

  // 지역명 추출 (주소에서)
  const getLocationName = () => {
    if (showNearby && myLocation) {
      return '내 주변';
    }
    if (reviews.length === 0) return '';
    const firstAddress = reviews[0]?.address || '';
    // 주소에서 동 단위 추출 (예: "서울특별시 강남구 역삼동" -> "역삼동")
    const match = firstAddress.match(/(\S+동)/);
    return match ? match[1] : '맛집';
  };

  if (!ready) {
    return (
      <MapSearchContainer>
        <LoadingMessage>지도를 불러오는 중...</LoadingMessage>
      </MapSearchContainer>
    );
  }

  return (
    <MapSearchContainer>
      <LeftPanel>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
          <SearchIcon onClick={handleSearch}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchIcon>
        </SearchBar>

        <ResultsHeader>
          <ResultsCount>
            {getLocationName()} 맛집 {reviews.length > 0 ? reviews.length.toLocaleString() : 0}곳
          </ResultsCount>
        </ResultsHeader>

        <RestaurantList data-restaurant-list>
          {reviews.length === 0 && !loading ? (
            <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
          ) : (
            reviews.map((review) => (
              <RestaurantCard
                key={review.reviewNo}
                review={review}
                isSelected={selectedReview?.reviewNo === review.reviewNo}
                onClick={() => handleCardClick(review)}
                onViewDetail={() => navigate(`/reviews/${review.reviewNo}`)}
              />
            ))
          )}
          {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
        </RestaurantList>
      </LeftPanel>

      <RightPanel>
        <MapContainer>
          <KakaoMap
            center={mapCenter}
            level={mapLevel}
            markers={[
              // 내 위치 마커
              ...(myLocation && showNearby ? [{
                lat: myLocation.lat,
                lng: myLocation.lng,
                isMyLocation: true,
              }] : []),
              // 음식점 마커 (검색/필터 결과에만 표시)
              // 반경 모드일 때는 반경 내 마커만, 아니면 검색 결과 마커만
              ...(showNearby && myLocation ? getNearbyMarkers() : markers).map(m => ({
                lat: m.lat,
                lng: m.lng,
                reviewNo: m.reviewNo,
                onClick: () => handleMarkerClick(m),
              })),
            ]}
            circle={
              showNearby && myLocation
                ? {
                    center: myLocation,
                    radius: radius * 1000, // km를 m로 변환
                  }
                : null
            }
            onMapCreated={handleMapCreated}
          />
          <NearbyButton onClick={toggleNearbyView} $active={showNearby} title={showNearby ? '반경 해제' : '내 주변 보기'}>
            <NearbyIcon src={radiusIcon} alt="내 주변" />
          </NearbyButton>
          {showNearby && myLocation && (
            <RadiusFilter>
              <RadiusFilterTitle>
                <RadiusIcon src={radiusIcon} alt="반경" />
                반경
              </RadiusFilterTitle>
              <RadiusButton 
                $active={radius === 1} 
                onClick={() => setRadius(1)}
              >
                1km
              </RadiusButton>
              <RadiusButton 
                $active={radius === 3} 
                onClick={() => setRadius(3)}
              >
                3km
              </RadiusButton>
            </RadiusFilter>
          )}
          <MapControls>
            <LocationButton onClick={toggleNearbyView} title="내 위치로 이동">
              📍
            </LocationButton>
          </MapControls>
        </MapContainer>
      </RightPanel>
    </MapSearchContainer>
  );
};

export default MapSearchPage;

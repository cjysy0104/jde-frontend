import React, { useState, useEffect } from 'react';
import useKakaoMapScript from '../../../utils/map/useKakaoMapScript';
import KakaoMap from '../common/Map/KakaoMap';
import {
  MapContainer,
  RestaurantInfo,
  RestaurantImage,
  RestaurantDetails,
  RestaurantName,
  RestaurantAddress,
  MapControls,
  ControlButton,
  LoadingMessage
} from './ReviewMapSection.styled';

const ReviewMapSection = ({ restaurant }) => {
  const ready = useKakaoMapScript();
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 서울 기본값
  const [level, setLevel] = useState(3);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 주소를 좌표로 변환
  useEffect(() => {
    if (!ready || !restaurant || !restaurant.address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(restaurant.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x)
        };

        setCenter(coords);
        setMarkers([
          {
            lat: coords.lat,
            lng: coords.lng,
            title: restaurant.name
          }
        ]);
        setIsLoading(false);
      } else {
        console.error('주소 검색 실패:', restaurant.address);
        setIsLoading(false);
      }
    });
  }, [ready, restaurant]);

  const handleZoomIn = () => {
    setLevel(prev => Math.max(1, prev - 1));
  };

  const handleZoomOut = () => {
    setLevel(prev => Math.min(14, prev + 1));
  };

  const handleResetPosition = () => {
    if (markers.length > 0) {
      setCenter({ lat: markers[0].lat, lng: markers[0].lng });
      setLevel(3);
    }
  };

  if (!ready) {
    return (
      <MapContainer>
        <LoadingMessage>지도를 불러오는 중...</LoadingMessage>
      </MapContainer>
    );
  }

  return (
    <MapContainer>
      {restaurant && !isLoading && (
        <RestaurantInfo>
          <RestaurantImage 
            src={restaurant.thumbnailUrl || 'https://via.placeholder.com/60'} 
            alt={restaurant.name}
          />
          <RestaurantDetails>
            <RestaurantName>{restaurant.normalName}</RestaurantName>
            <RestaurantAddress>{restaurant.address}</RestaurantAddress>
          </RestaurantDetails>
        </RestaurantInfo>
      )}

      <KakaoMap
        center={center}
        level={level}
        markers={markers}
      />

      <MapControls>
        <ControlButton onClick={handleZoomIn} title="확대">+</ControlButton>
        <ControlButton onClick={handleZoomOut} title="축소">-</ControlButton>
        <ControlButton onClick={handleResetPosition} title="현재 위치">📍</ControlButton>
      </MapControls>
    </MapContainer>
  );
};

export default ReviewMapSection;

// 사용 예시
/*
import ReviewMapSection from './components/ReviewMapSection';

const restaurant = {
  name: '부산어묵집',
  address: '서울특별시 강남구 테헤란로 123',
  thumbnailUrl: 'https://example.com/image.jpg'
};

<ReviewMapSection restaurant={restaurant} />
*/
import React, { useEffect, useRef, useState } from 'react';
import { MapWrapper } from './KakaoMap.styled';

const KakaoMap = ({ center, level, markers = [], onMapCreated }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);

  // 지도 초기화
  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: level || 3
    };

    const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(kakaoMap);

    if (onMapCreated) {
      onMapCreated(kakaoMap);
    }
  }, []);

  // 중심 좌표 변경
  useEffect(() => {
    if (!map || !center) return;
    
    const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
    map.setCenter(moveLatLng);
  }, [map, center]);

  // 레벨 변경
  useEffect(() => {
    if (!map || !level) return;
    
    map.setLevel(level);
  }, [map, level]);

  // 마커 업데이트
  useEffect(() => {
    if (!map) return;

    // 기존 마커 제거
    mapMarkers.forEach(marker => marker.setMap(null));

    // 새 마커 생성
    const newMarkers = markers.map(markerData => {
      const markerPosition = new window.kakao.maps.LatLng(
        markerData.lat,
        markerData.lng
      );
      
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map
      });

      // 마커 클릭 이벤트
      if (markerData.onClick) {
        window.kakao.maps.event.addListener(marker, 'click', () => {
          markerData.onClick(markerData);
        });
      }

      return marker;
    });

    setMapMarkers(newMarkers);

    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers]);

  return <MapWrapper ref={mapRef} />;
};

export default KakaoMap;

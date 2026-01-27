import React, { useEffect, useRef, useState } from 'react';
import { MapWrapper } from './KakaoMap.styled';

const KakaoMap = ({ center, level, markers = [], circle = null, onMapCreated }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [circleOverlay, setCircleOverlay] = useState(null);

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
      
      // 내 위치 마커는 커스텀 HTML 마커 사용
      let marker;
      if (markerData.isMyLocation) {
        // 내 위치 마커 (커스텀 HTML)
        const markerContent = document.createElement('div');
        markerContent.style.cssText = `
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        
        // 내부 점
        const innerDot = document.createElement('div');
        innerDot.style.cssText = `
          width: 12px;
          height: 12px;
          background: #ffffff;
          border-radius: 50%;
        `;
        markerContent.appendChild(innerDot);
        
        // 커스텀 오버레이로 마커 생성
        marker = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: markerContent,
          yAnchor: 0.5,
          xAnchor: 0.5,
        });
        marker.setMap(map);
        
        // 클릭 이벤트 추가
        if (markerData.onClick) {
          markerContent.style.cursor = 'pointer';
          markerContent.addEventListener('click', () => {
            markerData.onClick(markerData);
          });
        }
      } else {
        // 일반 음식점 마커
        marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map
        });
        
        // 마커 클릭 이벤트
        if (markerData.onClick) {
          window.kakao.maps.event.addListener(marker, 'click', () => {
            markerData.onClick(markerData);
          });
        }
      }

      return marker;
    });

    setMapMarkers(newMarkers);

    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers]);

  // 반경 원 표시
  useEffect(() => {
    if (!map) return;

    // 기존 원 제거
    if (circleOverlay) {
      circleOverlay.setMap(null);
    }

    // 새 원 생성
    if (circle) {
      const circleObj = new window.kakao.maps.Circle({
        center: new window.kakao.maps.LatLng(circle.center.lat, circle.center.lng),
        radius: circle.radius, // 미터 단위
        strokeWeight: 2,
        strokeColor: '#6366f1',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#6366f1',
        fillOpacity: 0.15,
      });

      circleObj.setMap(map);
      setCircleOverlay(circleObj);
    } else {
      setCircleOverlay(null);
    }

    return () => {
      if (circleOverlay) {
        circleOverlay.setMap(null);
      }
    };
  }, [map, circle]);

  return <MapWrapper ref={mapRef} />;
};

export default KakaoMap;

import React, { useEffect, useRef } from 'react';
import { MapWrapper } from './KakaoMap.styled';

<<<<<<< HEAD
const KakaoMap = ({ center, level, markers = [], circle = null, onMapCreated }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [circleOverlay, setCircleOverlay] = useState(null);
=======
const KakaoMap = ({ center, level = 3, markers = [], onMapCreated }) => {
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
>>>>>>> 4fdd2cf80e33ad6e78e0759bb5aad42399180bfe

  // 1) 지도 최초 생성 (딱 1번)
  useEffect(() => {
    if (!mapElRef.current || !window.kakao?.maps) return;

    const map = new window.kakao.maps.Map(mapElRef.current, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    });

    mapRef.current = map;
    onMapCreated?.(map);

    requestAnimationFrame(() => {
      map.relayout();
      map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
    });
  }, []); 

  // 2) center/level 반영
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.relayout();
    map.setLevel(level);
    map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
  }, [center?.lat, center?.lng, level]);

  // 3) markers 반영
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 기존 마커 제거
    markerRefs.current.forEach((m) => m.setMap(null));
    markerRefs.current = [];

    // 새 마커 생성
<<<<<<< HEAD
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
=======
    markers.forEach((mk) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(mk.lat, mk.lng),
      });

      if (mk.onClick) {
        window.kakao.maps.event.addListener(marker, 'click', () => mk.onClick(mk));
>>>>>>> 4fdd2cf80e33ad6e78e0759bb5aad42399180bfe
      }

      markerRefs.current.push(marker);
    });
  }, [markers]);

<<<<<<< HEAD
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
=======
  return <MapWrapper ref={mapElRef} />;
>>>>>>> 4fdd2cf80e33ad6e78e0759bb5aad42399180bfe
};

export default KakaoMap;

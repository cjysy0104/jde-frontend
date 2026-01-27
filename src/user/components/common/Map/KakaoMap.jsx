import React, { useEffect, useRef } from 'react';
import { MapWrapper } from './KakaoMap.styled';

const KakaoMap = ({ center, level = 3, markers = [], onMapCreated }) => {
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);

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
    markers.forEach((mk) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(mk.lat, mk.lng),
      });

      if (mk.onClick) {
        window.kakao.maps.event.addListener(marker, 'click', () => mk.onClick(mk));
      }

      markerRefs.current.push(marker);
    });
  }, [markers]);

  return <MapWrapper ref={mapElRef} />;
};

export default KakaoMap;

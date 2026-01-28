import React, { useEffect, useMemo, useState } from 'react';
import { InputGroup, Label, Input, SearchButton } from './AddressSection.styled';
import KakaoMap from '../common/Map/KakaoMap';
import useKakaoMapScript from '../../../utils/map/useKakaoMapScript';

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 }; // 서울시청(임시 기본값)

const AddressSection = ({ restaurant, onRestaurantChange, onSearchRestaurant }) => {
  const ready = useKakaoMapScript();

  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [level, setLevel] = useState(3);

  useEffect(() => {
    if (!ready) return;

    const latNum = Number(restaurant?.lat);
    const lngNum = Number(restaurant?.lng);

    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) return;

    setCenter({ lat: latNum, lng: lngNum });
    setLevel(3);
    console.log("kakao ready:", ready, "key:", !!(window.ENV?.KAKAO_MAP_APP_KEY ?? import.meta.env.VITE_KAKAO_MAP_APP_KEY));

  }, [ready, restaurant?.lat, restaurant?.lng]);

  const markers = useMemo(() => {
    const latNum = Number(restaurant?.lat);
    const lngNum = Number(restaurant?.lng);

    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) return [];

    return [
      {
        lat: latNum,
        lng: lngNum,
        title: restaurant?.name || '선택한 장소',
      },
    ];
  }, [restaurant?.lat, restaurant?.lng, restaurant?.name]);

  return (
    <>
      <InputGroup>
        <Label>식당명 *</Label>
        <Input
          type="text"
          placeholder="식당 이름을 입력하세요"
          value={restaurant.name}
          onChange={(e) => onRestaurantChange('name', e.target.value)}
        />
        <SearchButton onClick={onSearchRestaurant}>
          식당 검색
        </SearchButton>
      </InputGroup>

      <InputGroup>
        <Label>주소</Label>
        <Input
          type="text"
          placeholder="주소"
          value={restaurant.address}
          readOnly
        />
      </InputGroup>

        {ready && (
          <div style={{ marginTop: "12px" }}>
            <KakaoMap center={center} level={level} markers={markers} />
          </div>
        )}
    </>
  );
};

export default AddressSection;

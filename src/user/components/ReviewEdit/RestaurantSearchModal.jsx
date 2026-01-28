import React from "react";
import * as S from "./RestaurantSearchModal.styled";

const RestaurantSearchModal = ({ open, loading, error, results, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>식당 선택</S.Title>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.Header>

        <S.Body>
          {loading && <S.StateText>검색중...</S.StateText>}
          {!loading && error && <S.ErrorText>{error}</S.ErrorText>}

          {!loading && !error && results.length === 0 && (
            <S.StateText>검색 결과가 없습니다.</S.StateText>
          )}

          {!loading && !error && results.length > 0 && (
            <S.List>
              {results.map((p) => (
                <S.Item key={p.id} onClick={() => onSelect(p)}>
                  <S.PlaceName>{p.place_name}</S.PlaceName>
                  <S.Address>
                    {p.road_address_name || p.address_name}
                  </S.Address>
                  <S.Meta>
                    {p.category_name}
                    {p.phone ? ` · ${p.phone}` : ""}
                  </S.Meta>
                </S.Item>
              ))}
            </S.List>
          )}
        </S.Body>
      </S.Modal>
    </S.Overlay>
  );
};

export default RestaurantSearchModal;

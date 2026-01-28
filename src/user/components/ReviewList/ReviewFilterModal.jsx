// components/ReviewList/ReviewFilterModal.jsx
import React, { useEffect, useState } from "react";
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Section,
  SectionLabel,
  RadioGroup,
  RadioLabel,
  RatingRow,
  RatingInput,
  Tilde,
  ErrorText,
  Footer,
  CancelButton,
  ConfirmButton,
} from "./ReviewFilterModal.styled";

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "과거순", value: "oldest" },
  { label: "별점순", value: "rating" },
  { label: "좋아요순", value: "liked" },
];

const clampRating = (v) => {
  if (v === "" || v === null || v === undefined) return "";
  const n = Number(v);
  if (!Number.isFinite(n)) return "";
  return Math.min(5, Math.max(0, n));
};

const ReviewFilterModal = ({ open, initial, onClose, onConfirm }) => {
  // initial: { sort, minRating, maxRating }
  const [draft, setDraft] = useState({
    sort: "latest",
    minRating: "",
    maxRating: "",
  });

  useEffect(() => {
    if (!open) return;
    setDraft({
      sort: initial?.sort ?? "latest",
      minRating: initial?.minRating ?? "",
      maxRating: initial?.maxRating ?? "",
    });
  }, [open, initial]);

  if (!open) return null;

  const minGtMax =
    draft.minRating !== "" &&
    draft.maxRating !== "" &&
    Number(draft.minRating) > Number(draft.maxRating);

  const handleConfirm = () => {
    const min = clampRating(draft.minRating);
    const max = clampRating(draft.maxRating);

    onConfirm?.({
      sort: draft.sort,
      minRating: min === "" ? null : Number(min),
      maxRating: max === "" ? null : Number(max),
    });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>검색 필터</Title>
          <CloseButton type="button" onClick={onClose}>
            ✕
          </CloseButton>
        </Header>

        <Section>
          <SectionLabel>정렬</SectionLabel>
          <RadioGroup>
            {SORT_OPTIONS.map((opt) => (
              <RadioLabel key={opt.value}>
                <input
                  type="radio"
                  name="sort"
                  checked={draft.sort === opt.value}
                  onChange={() => setDraft((p) => ({ ...p, sort: opt.value }))}
                />
                {opt.label}
              </RadioLabel>
            ))}
          </RadioGroup>
        </Section>

        <Section>
          <SectionLabel>별점</SectionLabel>
          <RatingRow>
            <RatingInput
              value={draft.minRating}
              onChange={(e) => setDraft((p) => ({ ...p, minRating: e.target.value }))}
              placeholder="0.0"
              type="number"
              min="0"
              max="5"
              step="0.5"
            />
            <Tilde>~</Tilde>
            <RatingInput
              value={draft.maxRating}
              onChange={(e) => setDraft((p) => ({ ...p, maxRating: e.target.value }))}
              placeholder="5.0"
              type="number"
              min="0"
              max="5"
              step="0.5"
            />
          </RatingRow>

          {minGtMax && <ErrorText>최소 별점이 최대 별점보다 클 수 없어요.</ErrorText>}
        </Section>

        <Footer>
          <CancelButton type="button" onClick={onClose}>
            취소
          </CancelButton>
          <ConfirmButton type="button" onClick={handleConfirm} disabled={minGtMax}>
            확인
          </ConfirmButton>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default ReviewFilterModal;


import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal/Modal";
import * as S from "./ReportModal.styled";
import { reportApi } from "../../../utils/reportApi";

export default function ReportModal({
  open,
  onClose,
  targetLabel,
  targetTitle,
  targetWriter,
  onSubmit,
}) {
  const [cats, setCats] = useState([]);
  const [categoryNo, setCategoryNo] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => !!categoryNo && !loading, [categoryNo, loading]);

  useEffect(() => {
    if (!open) return;

    let mounted = true;
    (async () => {
      try {
        const res = await reportApi.getCategories();
        if (!mounted) return;
        setCats(res.data?.data ?? []);
      } catch (e) {
        console.error(e);
        alert("신고 카테고리를 불러오지 못했습니다.");
        onClose?.();
      }
    })();

    setCategoryNo(null);
    setContent("");
    return () => {
      mounted = false;
    };
  }, [open, onClose]);

  if (!open) return null;

  const primary = async () => {
    if (!categoryNo) {
      alert("신고 사유를 선택해주세요.");
      return;
    }
    try {
      setLoading(true);
      await onSubmit?.({
        reportCategoryNo: Number(categoryNo),
        reportContent: content.trim() ? content.trim() : null,
      });
      alert("신고가 접수되었습니다.");
      onClose?.();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "신고에 실패했습니다.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="신고 확인"
      onClose={onClose}
      primaryText={loading ? "처리중..." : "확인"}
      cancelText="취소"
      onPrimary={primary}
      maxWidth={640}
    >
      <S.Desc>
        {targetLabel} 신고는 이용수칙에 맞지 않은 글을 신고하는 기능이며, 반대 의견을 표시하는 것이 아닙니다.
        허위신고의 경우 신고자가 제재받을 수 있음을 유념해주세요.
      </S.Desc>

      <S.Meta>
        <S.MetaRow>
          <S.MetaKey>내용</S.MetaKey>
          <S.MetaVal title={targetTitle}>{targetTitle || "-"}</S.MetaVal>
        </S.MetaRow>
        <S.MetaRow>
          <S.MetaKey>작성자</S.MetaKey>
          <S.MetaVal>{targetWriter || "-"}</S.MetaVal>
        </S.MetaRow>
      </S.Meta>

      <S.SectionTitle>신고사유</S.SectionTitle>
      <S.RadioGrid>
        {cats.map((c) => (
          <S.RadioItem key={c.reportCategoryNo}>
            <input
              type="radio"
              name="reportCategory"
              value={c.reportCategoryNo}
              checked={String(categoryNo) === String(c.reportCategoryNo)}
              onChange={(e) => setCategoryNo(e.target.value)}
            />
            <span>{c.reportCategoryTitle}</span>
          </S.RadioItem>
        ))}
      </S.RadioGrid>

      <S.SectionTitle>상세내용(선택)</S.SectionTitle>
      <S.TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="구체적인 사유를 입력해주세요 (최대 200자)"
        maxLength={200}
      />

      <S.ConfirmLine>정말 신고하시겠습니까?</S.ConfirmLine>

      <S.HiddenSubmitHint aria-hidden="true">
        {canSubmit ? "" : ""}
      </S.HiddenSubmitHint>
    </Modal>
  );
}

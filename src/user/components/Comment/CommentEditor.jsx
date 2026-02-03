import React from "react";
import {
  EditTextarea,
  EditActions,
  SaveButton,
  CancelButton,
} from "./Comment.styled";

export default function CommentEditor({
  value,
  onChange,
  onSave,
  onCancel,
  maxLength = 500,
}) {
  const disabled = !value?.trim();

  return (
    <>
      <EditTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
      />
      <EditActions>
        <SaveButton onClick={onSave} disabled={disabled}>
          저장
        </SaveButton>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </EditActions>
    </>
  );
}

import React from 'react';
import {
  FileUploadContainer,
  FilePreviewWrapper,
  FilePreview,
  RemoveButton,
  UploadButton,
  UploadIcon,
  UploadText,
  HiddenInput,
  OrderBadge,
  ReorderControls,
  MoveButton,
} from './FileSection.styled';

const FileSection = ({ files, onFilesChange }) => {
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    const allowedTypes = ['image/jpeg', 'image/png'];

    const filteredFiles = uploadedFiles.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert('jpg, jpeg, png 이미지 파일만 업로드 가능합니다.');
        return false;
      }
      return true;
    });

    const newFiles = filteredFiles.map(file => ({
      type: "new",
      file,
      preview: URL.createObjectURL(file)
    }));

    onFilesChange([...files, ...newFiles].slice(0, 5));

    e.target.value = '';
  };


  const handleRemoveFile = (index) => {
      const target = files[index];

      if (target?.type === "new" && target.preview) {
        URL.revokeObjectURL(target.preview);
      }

      onFilesChange(files.filter((_, i) => i !== index));
  };
  const moveFile = (from, to) => {
    if (to < 0 || to >= files.length) return;

    const next = [...files];
    const [picked] = next.splice(from, 1);
    next.splice(to, 0, picked);

    onFilesChange(next);
  };


  return (
    <FileUploadContainer>
      {files.map((file, index) => (
        <FilePreviewWrapper key={index}>
          <FilePreview src={file.preview ?? file.fileUrl} alt={`preview-${index}`} />

          <OrderBadge $isMain={index === 0}>
            {index === 0 ? '대표' : index + 1}
          </OrderBadge>

          <ReorderControls>
            <MoveButton
              type="button"
              disabled={index === 0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                moveFile(index, index - 1);
              }}
              aria-label="왼쪽으로 이동"
              title="왼쪽"
            >
              ←
            </MoveButton>

            <MoveButton
              type="button"
              disabled={index === files.length - 1}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                moveFile(index, index + 1);
              }}
              aria-label="오른쪽으로 이동"
              title="오른쪽"
            >
              →
            </MoveButton>
          </ReorderControls>

          <RemoveButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveFile(index);
            }}
            aria-label="삭제"
            title="삭제"
          >
            ×
          </RemoveButton>
        </FilePreviewWrapper>
      ))}

      {files.length < 5 && (
        <UploadButton type="button">
          <HiddenInput
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            multiple
            onChange={handleFileUpload}
          />
          <UploadIcon>📷</UploadIcon>
          <UploadText>{files.length}/5</UploadText>
        </UploadButton>
      )}
    </FileUploadContainer>
  );
};


export default FileSection;
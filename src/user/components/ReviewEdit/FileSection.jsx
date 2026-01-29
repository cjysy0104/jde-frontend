import React from 'react';
import {
  FileUploadContainer,
  FilePreviewWrapper,
  FilePreview,
  RemoveButton,
  UploadButton,
  UploadIcon,
  UploadText,
  HiddenInput
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
      file,
      preview: URL.createObjectURL(file)
    }));

    onFilesChange([...files, ...newFiles].slice(0, 5));

    e.target.value = '';
  };


  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <FileUploadContainer>
      {files.map((file, index) => (
        <FilePreviewWrapper key={index}>
          <FilePreview src={file.preview ?? file.fileUrl} alt={`preview-${index}`} />
          <RemoveButton onClick={() => handleRemoveFile(index)}>×</RemoveButton>
        </FilePreviewWrapper>
      ))}
      
      {files.length < 5 && (
        <UploadButton>
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
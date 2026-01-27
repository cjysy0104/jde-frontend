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
    const newFiles = uploadedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    onFilesChange([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <FileUploadContainer>
      {files.map((file, index) => (
        <FilePreviewWrapper key={index}>
          <FilePreview src={file.preview} alt={`preview-${index}`} />
          <RemoveButton onClick={() => handleRemoveFile(index)}>×</RemoveButton>
        </FilePreviewWrapper>
      ))}
      
      {files.length < 5 && (
        <UploadButton>
          <HiddenInput
            type="file"
            accept="image/*"
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
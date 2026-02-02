import styled from 'styled-components';

export const FileUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const FilePreviewWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const FilePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const UploadButton = styled.label`
  width: 120px;
  height: 120px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fafafa;
  transition: all 0.2s;
  
  &:hover {
    border-color: #ff6b35;
    background-color: #fff5f2;
  }
`;

export const UploadIcon = styled.div`
  font-size: 32px;
  color: #999;
  margin-bottom: 8px;
`;

export const UploadText = styled.span`
  font-size: 12px;
  color: #999;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const OrderBadge = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 2px 7px;
  border-radius: 10px;

  background: ${({ $isMain }) =>
    $isMain ? "rgba(249, 115, 22, 0.95)" : "rgba(0, 0, 0, 0.55)"};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
`;

export const ReorderControls = styled.div`
  position: absolute;
  left: 6px;
  bottom: 6px;
  display: flex;
  gap: 6px;
`;

export const MoveButton = styled.button`
  width: 28px;
  height: 24px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.9);
  color: #111827;
  font-size: 14px;
  font-weight: 800;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
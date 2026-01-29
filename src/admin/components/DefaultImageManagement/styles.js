import styled from 'styled-components';

export const PageWrap = styled.div`
  padding: 24px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const PrimaryButton = styled.button`
  border: 0;
  background: #111827;
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  width: 100%;
  border: 1px solid #fecaca;
  background: #fff;
  color: #dc2626;
  padding: 8px 10px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #fef2f2;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  margin-bottom: 14px;
`;

export const DangerText = styled.div`
  color: #dc2626;
  font-weight: 700;
  margin: 8px 0 12px;
`;

export const MutedText = styled.span`
  color: #6b7280;
  font-size: 13px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.div`
  width: 90px;
  font-size: 14px;
  font-weight: 700;
  color: #374151;
`;

export const TextInput = styled.input`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: #9ca3af;
  }
`;

export const FileInput = styled.input`
  flex: 1;
`;

export const GridViewport = styled.div`
  max-height: 550px;
  overflow-y: ${(props) => (props.$scroll ? 'auto' : 'hidden')};
  padding-right: ${(props) => (props.$scroll ? '6px' : '0')};
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
`;

export const ImageCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;

  /* ✅ hover 시 살짝 뜨는 효과 */
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.10);
  }
`;

export const Thumb = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

export const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
`;

export const Meta = styled.div`
  padding: 10px;
`;

export const MetaRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Value = styled.div`
  font-size: 13px;
  color: #111827;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

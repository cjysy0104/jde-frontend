import styled from "styled-components";

export const Desc = styled.p`
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.5;
  color: #374151;
`;

export const Meta = styled.div`
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  padding: 12px;
  background: rgba(0,0,0,0.02);
  margin-bottom: 14px;
`;

export const MetaRow = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  padding: 6px 0;
`;

export const MetaKey = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: #6b7280;
`;

export const MetaVal = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SectionTitle = styled.div`
  margin: 12px 0 8px;
  font-size: 13px;
  font-weight: 900;
  color: #111827;
`;

export const RadioGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const RadioItem = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  cursor: pointer;

  input {
    transform: translateY(-0.5px);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border: 1px solid rgba(0,0,0,0.14);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: rgba(17,24,39,0.55);
    box-shadow: 0 0 0 3px rgba(17,24,39,0.08);
  }
`;

export const ConfirmLine = styled.div`
  margin-top: 14px;
  font-size: 14px;
  font-weight: 900;
  color: #111827;
`;

export const HiddenSubmitHint = styled.div`
  height: 0;
`;

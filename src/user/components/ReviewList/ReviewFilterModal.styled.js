import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 520px;
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 4px 8px;
`;

export const Section = styled.div`
  margin-bottom: 18px;
`;

export const SectionLabel = styled.div`
  font-weight: 800;
  margin-bottom: 10px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
`;

export const RatingRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const RatingInput = styled.input`
  width: 120px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;

  &:focus {
    border-color: #f08a24;
  }
`;

export const Tilde = styled.span`
  font-weight: 700;
`;

export const ErrorText = styled.div`
  margin-top: 8px;
  color: #d32f2f;
  font-size: 12px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const CancelButton = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-weight: 800;
`;

export const ConfirmButton = styled.button`
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: #e67e22;
  color: white;
  cursor: pointer;
  font-weight: 900;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

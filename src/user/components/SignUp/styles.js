import styled from "styled-components";

export const SignupPageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 80px 24px;
`;

export const SignupFormContainer = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SignupTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  text-align: center;
`;

/* ✅ 핵심: "필드(그룹) 간 간격"은 form에서 관리 */
export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px; /* 인풋 다음 라벨(다음 그룹)과의 간격 */
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; /* 라벨-인풋은 붙게 */
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

/* ✅ 라벨 볼드 제거 */
export const Label = styled.label`
  font-size: 13px;
  font-weight: 400; /* 일반 글씨 */
  color: #111827;
  white-space: nowrap;
`;

export const Required = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

export const InlineError = styled.span`
  font-size: 12px;
  color: #ef4444;
  text-align: right;
  line-height: 1.2;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;

  /* 비밀번호 토글 버튼(인풋 내부) 공간 확보 */
  padding-right: 42px;

  &:focus {
    outline: none;
    border-color: #f97316;
  }

  &[aria-invalid="true"] {
    border-color: #ef4444;
  }
`;

export const CheckButton = styled.button`
  padding: 0 12px;
  border-radius: 8px;
  border: none;
  background-color: #fb923c;
  color: white;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f97316;
  }
`;

/* ✅ 비밀번호 인풋 폭을 일반 인풋과 동일하게 */
export const PasswordField = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6b7280;
  }
`;

export const AgreementWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

export const AgreementLabel = styled.span`
  color: #374151;
  flex: 1;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #f97316;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

export const LoginLink = styled.a`
  text-align: center;
  font-size: 13px;
  color: #6b7280;

  &:hover {
    color: #f97316;
  }
`;

export const InlineSuccess = styled.span`
  font-size: 12px;
  color: #16a34a;
  text-align: right;
  line-height: 1.2;
`;

export const InlineInfo = styled.span`
  font-size: 12px;
  color: #6b7280;
  text-align: right;
  line-height: 1.2;
`;

export const SubmitMessage = styled.p`
  margin: -6px 0 0;
  font-size: 12px;
  color: #ef4444;
`;

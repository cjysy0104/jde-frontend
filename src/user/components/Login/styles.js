import styled from "styled-components";

export const LoginPageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 80px 24px;
  background-color: white;
`;

export const LoginFormContainer = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const LoginTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

export const LoginSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin: 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 44px 12px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #f97316;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;

  &:hover {
    color: #111827;
  }
`;

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Checkbox = styled.input`
  accent-color: #f97316;
`;

export const CheckboxLabel = styled.span`
  font-size: 13px;
`;

export const ForgotPasswordLink = styled.a`
  font-size: 13px;
  color: #6b7280;

  &:hover {
    color: #f97316;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 12px;

  background-color: #f97316;
  color: white;
  border: none;
  border-radius: 8px;

  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    background-color: #ea580c;
  }

  &:disabled {
    background-color: #d1d5db;
  }
`;

export const Divider = styled.div`
  position: relative;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e5e7eb;
  }
`;

export const DividerText = styled.span`
  position: relative;
  background-color: white;
  padding: 0 12px;
  font-size: 13px;
  color: #6b7280;
`;

export const SignUpPrompt = styled.p`
  font-size: 13px;
  text-align: center;
  color: #6b7280;
`;

export const SignUpLink = styled.a`
  color: #f97316;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #dc2626;
  padding: 10px;
  border-radius: 6px;
  font-size: 13px;
`;

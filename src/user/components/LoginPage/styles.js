import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const LoginContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  flex: 1;
`;

export const LoginHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex-shrink: 0;
`;

export const HeaderLogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
`;

export const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export const LogoText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const HeaderAuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;


export const HeaderAuthButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#f97316' : 'white'};
  color: ${props => props.active ? 'white' : '#111827'};
  border: 1px solid ${props => props.active ? '#f97316' : '#d1d5db'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#ea580c' : '#f9fafb'};
    border-color: ${props => props.active ? '#ea580c' : '#9ca3af'};
  }
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

export const LoginTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  text-align: center;
`;

export const LoginSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  color: #111827;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #f97316;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s;
  
  &:hover {
    color: #111827;
  }
  
  svg {
    font-size: 18px;
  }
`;

export const FormOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #f97316;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #111827;
  cursor: pointer;
`;

export const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #f97316;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #f97316;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background-color: #ea580c;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  border: 1px solid #fecaca;
`;

export const Divider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e5e7eb;
  }
`;

export const DividerText = styled.span`
  position: relative;
  background-color: white;
  padding: 0 16px;
  font-size: 14px;
  color: #6b7280;
`;

export const SignUpPrompt = styled.p`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const SignUpLink = styled.a`
  color: #f97316;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #ea580c;
    text-decoration: underline;
  }
`;

export const LoginFooter = styled.footer`
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Copyright = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
`;

export const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FooterLink = styled.a`
  font-size: 12px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #111827;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SocialIcon = styled.a`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #111827;
  }
  
  svg {
    font-size: 16px;
  }
`;

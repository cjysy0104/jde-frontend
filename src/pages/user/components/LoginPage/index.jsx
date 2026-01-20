import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import logo from '../../../../assets/logo.png';
import {
  LoginPageContainer,
  LoginContent,
  LoginHeader,
  HeaderTitle,
  HeaderLogoSection,
  LogoImage,
  LogoText,
  HeaderAuthButtons,
  HeaderAuthButton,
  LoginFormContainer,
  LoginTitle,
  LoginSubtitle,
  FormGroup,
  Label,
  Input,
  PasswordInputWrapper,
  PasswordToggle,
  FormOptions,
  CheckboxWrapper,
  Checkbox,
  CheckboxLabel,
  ForgotPasswordLink,
  LoginButton,
  Divider,
  DividerText,
  SignUpPrompt,
  SignUpLink,
  LoginFooter,
  FooterContent,
  Copyright,
  FooterLinks,
  FooterLink,
  SocialIcons,
  SocialIcon,
  ErrorMessage,
} from './styles';
import { useNavigate } from 'react-router';

const API_BASE_URL = window.ENV?.API_BASE_URL || 'http://127.0.0.1:8080';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        let errorMessage = `로그인 실패 (${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Login success:', data);
      
      // 성공 메시지 표시
      if (data.data) {
        alert('로그인에 성공했습니다!');
        // TODO: 토큰 저장 및 리다이렉트 처리
        // navigate('/user');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // 네트워크 에러 처리
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        setError(error.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginContent>
        <LoginHeader>
          <HeaderTitle>로그인 화면</HeaderTitle>
          <HeaderLogoSection onClick={() => navigate('/')}>
            <LogoImage src={logo} alt="JUST DO EAT"  />
            <LogoText>JUST DO EAT</LogoText>
          </HeaderLogoSection>
          <HeaderAuthButtons>
            <HeaderAuthButton active>로그인</HeaderAuthButton>
            <HeaderAuthButton>회원가입</HeaderAuthButton>
          </HeaderAuthButtons>
        </LoginHeader>

        <LoginFormContainer>
          <LoginTitle>로그인</LoginTitle>
          <LoginSubtitle>계정에 로그인하여 계속하세요</LoginSubtitle>

          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <FormGroup>
              <Label htmlFor="email">이메일</Label>
              <Input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">비밀번호</Label>
              <PasswordInputWrapper>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInputWrapper>
            </FormGroup>

            <FormOptions>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  disabled={isLoading}
                />
                <CheckboxLabel htmlFor="keepLoggedIn">
                  로그인 상태 유지
                </CheckboxLabel>
              </CheckboxWrapper>
              <ForgotPasswordLink href="#">비밀번호 찾기</ForgotPasswordLink>
            </FormOptions>

            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </LoginButton>
          </form>

          <Divider>
            <DividerText>또는</DividerText>
          </Divider>

          <SignUpPrompt>
            계정이 없으신가요? <SignUpLink href="#">회원가입</SignUpLink>
          </SignUpPrompt>
        </LoginFormContainer>

        <LoginFooter>
          <FooterContent>
            <Copyright>©2024 Just Do Eat. All rights reserved.</Copyright>
            <FooterLinks>
              <FooterLink href="#">서비스게</FooterLink>
              <FooterLink href="#">이용약관</FooterLink>
              <FooterLink href="#">개인정보 처리방침</FooterLink>
              <FooterLink href="#">고객센터</FooterLink>
            </FooterLinks>
            <SocialIcons>
              <SocialIcon href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Facebook">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
            </SocialIcons>
          </FooterContent>
        </LoginFooter>
      </LoginContent>
    </LoginPageContainer>
  );
};

export default LoginPage;

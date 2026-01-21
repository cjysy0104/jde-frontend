import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
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
import axios from 'axios';
import { authStorage } from '../../../utils/api';

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
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const responseData = response.data;
      console.log('Login success:', responseData);
      
      // 성공 메시지 표시 및 토큰 저장
      if (responseData.data) {
        const loginData = responseData.data;
        
        // 액세스 토큰 저장
        if (loginData.accessToken) {
          authStorage.setToken(loginData.accessToken);
        }
        
        // 리프레시 토큰 저장
        if (loginData.refreshToken) {
          authStorage.setRefreshToken(loginData.refreshToken);
        }
        
        // 회원 정보 저장 (data 자체에 모든 회원 정보가 포함되어 있음)
        const memberInfo = {
          email: loginData.email,
          memberName: loginData.memberName,
          memberNo: loginData.memberNo,
          nickname: loginData.nickname,
          phone: loginData.phone,
          role: loginData.role,
          status: loginData.status,
          fileUrl: loginData.fileUrl,
          enrollDate: loginData.enrollDate,
        };
        authStorage.setMemberInfo(memberInfo);
        
        alert('로그인에 성공했습니다!');
        
        // admin 페이지로 리다이렉트
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // axios 에러 처리
      if (error.response) {
        // 서버가 응답했지만 에러 상태 코드
        const errorMessage = error.response.data?.message || error.response.data?.error || error.message;
        setError(errorMessage || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못함
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        // 요청 설정 중 에러 발생
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

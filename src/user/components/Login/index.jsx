import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { authApi } from "../../../utils/api";
import { AuthContext } from "../context/AuthContext";

import {
  LoginPageContainer,
  LoginFormContainer,
  LoginTitle,
  LoginSubtitle,
  FormGroup,
  Label,
  LabelRow,
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
  ErrorMessage,
  InlineErrorMessage,
} from "./styles";

/* 유효성 검사 정책 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

const Login = () => {
  /* 상태관리 */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  /* 핸들러 */

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("이메일은 필수 입력사항입니다.");
    } else if (!emailRegex.test(value)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("비밀번호는 필수 입력사항입니다.");
    } else if (value.length < 8 || value.length > 16) {
      setPasswordError("비밀번호는 8자 이상 16자 이하만 가능합니다.");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "영문, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 서밋 하기전에 최종 방어
    if (emailError || passwordError || !email || !password) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.login(email, password);

      if (response.success) {
        login(response.data);
        navigate(from, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  /* 랜더 */

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginSubtitle>계정에 로그인하여 계속하세요</LoginSubtitle>

        <form onSubmit={handleSubmit} noValidate>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <LabelRow>
              <Label>이메일</Label>
              {emailError && <InlineErrorMessage>{emailError}</InlineErrorMessage>}
            </LabelRow>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <LabelRow>
              <Label>비밀번호</Label>
              {passwordError && <InlineErrorMessage>{passwordError}</InlineErrorMessage>}
            </LabelRow>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </PasswordInputWrapper>
          </FormGroup>

          <FormOptions>
            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
            </CheckboxWrapper>

            <ForgotPasswordLink href="#">비밀번호 찾기</ForgotPasswordLink>
          </FormOptions>

          <LoginButton
            disabled={
              isLoading || !!emailError || !!passwordError || !email || !password
            }
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </form>

        <Divider>
          <DividerText>또는</DividerText>
        </Divider>

        <SignUpPrompt>
          계정이 없으신가요? <SignUpLink as={Link} to="/signup">회원가입</SignUpLink>
        </SignUpPrompt>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default Login;

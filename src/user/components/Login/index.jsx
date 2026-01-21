import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/api";
import { AuthContext } from "../context/AuthContext";

import {
  LoginPageContainer,
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
  ErrorMessage,
} from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);

      if (response.success) {
        login(response.data);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginSubtitle>계정에 로그인하여 계속하세요</LoginSubtitle>

        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
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

            <ForgotPasswordLink href="#">
              비밀번호 찾기
            </ForgotPasswordLink>
          </FormOptions>

          <LoginButton disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </form>

        <Divider>
          <DividerText>또는</DividerText>
        </Divider>

        <SignUpPrompt>
          계정이 없으신가요? <SignUpLink href="/signup">회원가입</SignUpLink>
        </SignUpPrompt>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default Login;

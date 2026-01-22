import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { memberApi } from "../../../utils/api";

import {
  SignupPageContainer,
  SignupFormContainer,
  SignupTitle,
  FormElement,
  FormGroup,
  LabelRow,
  Label,
  Required,
  InlineError,
  InlineSuccess,
  InlineInfo,
  InputRow,
  Input,
  CheckButton,
  PasswordField,
  PasswordToggle,
  AgreementWrapper,
  AgreementLabel,
  SubmitButton,
  LoginLink,
  SubmitMessage,
} from "./styles";

/* ===== 서버 기준 정규식 ===== */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
const nameRegex = /^[a-zA-Z가-힣]*$/;
const phoneRegex = /^0\d{1,2}-\d{3,4}-\d{4}$/;

const isBlank = (v) => !v || !String(v).trim();

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    memberName: "",
    nickname: "",
    phone: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    memberName: "",
    nickname: "",
    phone: "",
    agree: "",
  });

  const [emailCheck, setEmailCheck] = useState({
    checked: false,
    ok: false,
    message: "",
    loading: false,
  });

  const [nicknameCheck, setNicknameCheck] = useState({
    checked: false,
    ok: false,
    message: "",
    loading: false,
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = (field, value, overridePassword) => {
    let msg = "";

    switch (field) {
      case "email":
        if (isBlank(value)) msg = "이메일은 필수 입력사항입니다.";
        else if (!emailRegex.test(value))
          msg = "이메일 형식이 올바르지 않습니다.";
        break;

      case "password":
        if (isBlank(value)) msg = "비밀번호는 필수 입력사항입니다.";
        else if (value.length < 8 || value.length > 16)
          msg = "비밀번호 값은 8글자 이상 16글자 이하만 사용할 수 있습니다.";
        else if (!passwordRegex.test(value))
          msg = "비밀번호는 영어, 숫자, 특수문자가 최소 1개 이상씩 필요합니다.";
        break;

      case "passwordConfirm": {
        const pw = overridePassword ?? form.password;
        if (isBlank(value)) msg = "비밀번호 확인은 필수 입력사항입니다.";
        else if (value !== pw) msg = "비밀번호가 일치하지 않습니다.";
        break;
      }

      case "memberName":
        if (isBlank(value)) msg = "이름은 필수 입력사항입니다.";
        else if (value.length < 2 || value.length > 40)
          msg = "이름은 2글자 이상 40글자 이하만 사용할 수 있습니다.";
        else if (!nameRegex.test(value))
          msg = "이름은 영어, 한글만 사용 가능합니다.";
        break;

      case "nickname":
        if (isBlank(value)) msg = "닉네임은 필수 입력사항입니다.";
        else if (value.length < 2 || value.length > 10)
          msg = "닉네임은 2글자 이상 10글자 이하만 사용할 수 있습니다.";
        else if (!nameRegex.test(value))
          msg = "닉네임은 영어, 한글만 사용 가능합니다.";
        break;

      case "phone":
        if (isBlank(value)) msg = "전화번호는 필수 입력사항입니다.";
        else if (!phoneRegex.test(value))
          msg = "전화번호 형식이 올바르지 않습니다.";
        break;

      case "agree":
        if (!value) msg = "약관 동의는 필수입니다.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: msg }));
    return msg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSubmitMessage("");

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (type !== "checkbox") {
      validate(name, value);

      if (name === "password") {
        validate("passwordConfirm", form.passwordConfirm, value);
      }

      // 값이 바뀌면 중복확인 상태 초기화
      if (name === "email") {
        setEmailCheck({ checked: false, ok: false, message: "", loading: false });
      }
      if (name === "nickname") {
        setNicknameCheck({
          checked: false,
          ok: false,
          message: "",
          loading: false,
        });
      }
    } else {
      validate(name, checked);
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    validate(name, type === "checkbox" ? checked : value);
  };

  const handleEmailCheck = async () => {
    const err = validate("email", form.email);
    if (err) return;

    setEmailCheck({ checked: false, ok: false, message: "", loading: true });

    try {
      const res = await memberApi.checkEmail(form.email);
      // res는 인터셉터에서 response.data
      setEmailCheck({
        checked: true,
        ok: !!res?.success,
        message: res?.message || "사용 가능한 이메일입니다.",
        loading: false,
      });
    } catch (e) {
      // 인터셉터에서 throw new Error(message)
      setEmailCheck({
        checked: true,
        ok: false,
        message: e?.message || "이메일 중복확인 중 오류가 발생했습니다.",
        loading: false,
      });
    }
  };

  const handleNicknameCheck = async () => {
    const err = validate("nickname", form.nickname);
    if (err) return;

    setNicknameCheck({ checked: false, ok: false, message: "", loading: true });

    try {
      const res = await memberApi.checkNickname(form.nickname);
      setNicknameCheck({
        checked: true,
        ok: !!res?.success,
        message: res?.message || "사용 가능한 닉네임입니다.",
        loading: false,
      });
    } catch (e) {
      setNicknameCheck({
        checked: true,
        ok: false,
        message: e?.message || "닉네임 중복확인 중 오류가 발생했습니다.",
        loading: false,
      });
    }
  };

  const isDisabled = useMemo(() => {
    const hasAnyError = Object.values(errors).some(Boolean);

    const missing =
      isBlank(form.email) ||
      isBlank(form.password) ||
      isBlank(form.passwordConfirm) ||
      isBlank(form.memberName) ||
      isBlank(form.nickname) ||
      isBlank(form.phone) ||
      !form.agree;

    const dupNotPassed = !emailCheck.ok || !nicknameCheck.ok;
    const checking = emailCheck.loading || nicknameCheck.loading;

    return hasAnyError || missing || dupNotPassed || checking;
  }, [errors, form, emailCheck, nicknameCheck]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    const emailErr = validate("email", form.email);
    const pwErr = validate("password", form.password);
    const pwcErr = validate("passwordConfirm", form.passwordConfirm);
    const nameErr = validate("memberName", form.memberName);
    const nickErr = validate("nickname", form.nickname);
    const phoneErr = validate("phone", form.phone);
    const agreeErr = validate("agree", form.agree);

    const hasError = [emailErr, pwErr, pwcErr, nameErr, nickErr, phoneErr, agreeErr].some(Boolean);
    if (hasError) return;

    if (!emailCheck.ok) {
      setSubmitMessage("이메일 중복확인을 완료해 주세요.");
      return;
    }
    if (!nicknameCheck.ok) {
      setSubmitMessage("닉네임 중복확인을 완료해 주세요.");
      return;
    }

    try {
      const res = await memberApi.signup({
        email: form.email,
        password: form.password,
        memberName: form.memberName,
        nickname: form.nickname,
        phone: form.phone,
      });

      if (res?.success) {
        navigate("/login", { state: { from: "/" }, replace: true });
        return;
      }

      setSubmitMessage(res?.message || "회원가입에 실패했습니다.");
    } catch (e2) {
      setSubmitMessage(e2?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const renderEmailRightText = () => {
    if (errors.email) return <InlineError>{errors.email}</InlineError>;
    if (emailCheck.loading) return <InlineInfo>확인 중...</InlineInfo>;
    if (emailCheck.checked && emailCheck.ok)
      return <InlineSuccess>{emailCheck.message}</InlineSuccess>;
    if (emailCheck.checked && !emailCheck.ok)
      return <InlineError>{emailCheck.message}</InlineError>;
    return null;
  };

  const renderNicknameRightText = () => {
    if (errors.nickname) return <InlineError>{errors.nickname}</InlineError>;
    if (nicknameCheck.loading) return <InlineInfo>확인 중...</InlineInfo>;
    if (nicknameCheck.checked && nicknameCheck.ok)
      return <InlineSuccess>{nicknameCheck.message}</InlineSuccess>;
    if (nicknameCheck.checked && !nicknameCheck.ok)
      return <InlineError>{nicknameCheck.message}</InlineError>;
    return null;
  };

  return (
    <SignupPageContainer>
      <SignupFormContainer>
        <SignupTitle>회원가입</SignupTitle>

        <FormElement onSubmit={handleSubmit} noValidate>
          {/* 이메일 */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="email">
                이메일<Required>*</Required>
              </Label>
              {renderEmailRightText()}
            </LabelRow>

            <InputRow>
              <Input
                id="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email || (emailCheck.checked && !emailCheck.ok)}
              />
              <CheckButton
                type="button"
                onClick={handleEmailCheck}
                disabled={emailCheck.loading}
              >
                {emailCheck.loading ? "확인중" : "중복확인"}
              </CheckButton>
            </InputRow>
          </FormGroup>

          {/* 닉네임 */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="nickname">
                닉네임<Required>*</Required>
              </Label>
              {renderNicknameRightText()}
            </LabelRow>

            <InputRow>
              <Input
                id="nickname"
                name="nickname"
                placeholder="활동명을 입력하세요"
                value={form.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.nickname || (nicknameCheck.checked && !nicknameCheck.ok)}
              />
              <CheckButton
                type="button"
                onClick={handleNicknameCheck}
                disabled={nicknameCheck.loading}
              >
                {nicknameCheck.loading ? "확인중" : "중복확인"}
              </CheckButton>
            </InputRow>
          </FormGroup>

          {/* 이름 */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="memberName">
                이름<Required>*</Required>
              </Label>
              {errors.memberName && <InlineError>{errors.memberName}</InlineError>}
            </LabelRow>

            <Input
              id="memberName"
              name="memberName"
              placeholder="이름을 입력하세요"
              value={form.memberName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.memberName}
            />
          </FormGroup>

          {/* 전화번호 */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="phone">
                전화번호<Required>*</Required>
              </Label>
              {errors.phone && <InlineError>{errors.phone}</InlineError>}
            </LabelRow>

            <Input
              id="phone"
              name="phone"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
            />
          </FormGroup>

          {/* 비밀번호 */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="password">
                비밀번호<Required>*</Required>
              </Label>
              {errors.password && <InlineError>{errors.password}</InlineError>}
            </LabelRow>

            <PasswordField>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.password}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </PasswordField>
          </FormGroup>

          {/* 비밀번호 확인 */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="passwordConfirm">
                비밀번호 확인<Required>*</Required>
              </Label>
              {errors.passwordConfirm && (
                <InlineError>{errors.passwordConfirm}</InlineError>
              )}
            </LabelRow>

            <PasswordField>
              <Input
                id="passwordConfirm"
                type={showConfirm ? "text" : "password"}
                name="passwordConfirm"
                placeholder="비밀번호를 다시 입력하세요"
                value={form.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.passwordConfirm}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </PasswordField>
          </FormGroup>

          {/* 약관 */}
          <AgreementWrapper>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <AgreementLabel>이용약관과 개인정보처리방침에 동의합니다</AgreementLabel>
            {errors.agree && <InlineError>{errors.agree}</InlineError>}
          </AgreementWrapper>

          {submitMessage && <SubmitMessage>{submitMessage}</SubmitMessage>}

          <SubmitButton disabled={isDisabled}>회원가입</SubmitButton>
        </FormElement>

        <LoginLink href="/login">이미 계정이 있으신가요? 로그인</LoginLink>
      </SignupFormContainer>
    </SignupPageContainer>
  );
};

export default Signup;

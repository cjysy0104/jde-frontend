import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage, memberApi } from "../../../../utils/api"; // ✅ api.js에서 import

import {
  Page,
  TopBar,
  Title,
  EditButton,
  Card,
  ProfileRow,
  AvatarWrap,
  AvatarImg,
  AvatarFallback,
  ProfileMeta,
  MainName,
  SubEmail,
  InfoBox,
  InfoRow,
  Label,
  Value,
  WithdrawButton,
  ButtonRow,

  // 아래 스타일들은 MyProfileViewStyles에 추가되어 있어야 함
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalDesc,
  ModalActions,
  ModalButton,
  ModalButtonDanger,
  ModalInput,
  ErrorText,
  SuccessBox,
} from "./MyProfileViewStyles";

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function normalizeMember(raw) {
  if (!raw) return null;

  const email = raw.email ?? raw.memberEmail ?? raw.username ?? raw.sub ?? "";
  const name = raw.memberName ?? raw.name ?? "";
  const nickname = raw.nickname ?? raw.nickName ?? "";
  const phone = raw.phone ?? raw.memberPhone ?? raw.phoneNumber ?? "";

  const profileUrl =
    raw.profileUrl ??
    raw.profileImageUrl ??
    raw.profileImage ??
    raw.fileUrl ??
    raw.imageUrl ??
    raw.avatarUrl ??
    "";

  return { email, name, nickname, phone, profileUrl };
}

export default function MyProfileViewPage() {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  // 탈퇴 플로우 상태
  const [step, setStep] = useState("NONE"); // NONE | CONFIRM | PASSWORD | DONE
  const [password, setPassword] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    const load = () => {
      const stored = authStorage.getMemberInfo?.();
      const normalizedStored = normalizeMember(stored);
      if (normalizedStored) {
        setMember(normalizedStored);
        return;
      }

      const token = authStorage.getToken?.();
      const payload = token ? decodeJwtPayload(token) : null;
      setMember(normalizeMember(payload));
    };

    load();

    const onStorage = () => load();
    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onStorage);
    };
  }, []);

  const initial = (member?.nickname || member?.name || member?.email || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  const openConfirm = () => {
    setWithdrawError("");
    setPassword("");
    setStep("CONFIRM");
  };

  const closeAll = () => {
    if (withdrawing) return;
    setWithdrawError("");
    setPassword("");
    setStep("NONE");
  };

  const goPasswordModal = () => {
    setWithdrawError("");
    setPassword("");
    setStep("PASSWORD");
  };

  const handleWithdraw = async () => {
    if (!password.trim()) {
      setWithdrawError("비밀번호를 입력해주세요.");
      return;
    }

    setWithdrawing(true);
    setWithdrawError("");

    try {
      const res = await memberApi.withdraw(password);

      // apiClient가 response.data를 unwrap하도록 구성되어 있으면 res는 {status, success, message, data, ...}
      if (res?.success === false) {
        throw new Error(res?.message || "회원탈퇴에 실패했습니다.");
      }

      // 성공 시 인증정보 정리
      authStorage.clear();
      window.dispatchEvent(new Event("authChanged"));

      setStep("DONE");
    } catch (e) {
      const msg = e?.message || "회원탈퇴에 실패했습니다.";
      setWithdrawError(msg);
      setStep("PASSWORD"); // 비밀번호 모달 유지
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <Page>
      <TopBar>
        <Title>내 정보</Title>
        <EditButton type="button" onClick={() => navigate("/my/profile")}>
          정보 수정하기
        </EditButton>
      </TopBar>

      <Card>
        <ProfileRow>
          <AvatarWrap>
            {member?.profileUrl ? (
              <AvatarImg
                src={member.profileUrl}
                alt="profile"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placehold.co/160x160?text=USER";
                }}
              />
            ) : (
              <AvatarFallback>{initial}</AvatarFallback>
            )}
          </AvatarWrap>

          <ProfileMeta>
            <MainName>{member?.nickname || member?.name || "회원"}</MainName>
            <SubEmail>{member?.email || "-"}</SubEmail>
          </ProfileMeta>
        </ProfileRow>

        <InfoBox>
          <InfoRow>
            <Label>이메일</Label>
            <Value>{member?.email || "-"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>이름</Label>
            <Value>{member?.name || "-"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>닉네임</Label>
            <Value>{member?.nickname || "-"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>전화번호</Label>
            <Value>{member?.phone || "-"}</Value>
          </InfoRow>
        </InfoBox>
      </Card>

      <ButtonRow>
        <WithdrawButton type="button" onClick={openConfirm}>
          회원 탈퇴
        </WithdrawButton>
      </ButtonRow>

      {/* 1) 확인 모달 */}
      {step === "CONFIRM" && (
        <ModalOverlay onClick={closeAll}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>정말 회원 탈퇴하시겠습니까?</ModalTitle>
            <ModalDesc>
              탈퇴 시 계정 정보가 삭제되며 복구가 어려울 수 있습니다.
            </ModalDesc>

            <ModalActions>
              <ModalButton type="button" onClick={closeAll} disabled={withdrawing}>
                아니오
              </ModalButton>
              <ModalButtonDanger type="button" onClick={goPasswordModal} disabled={withdrawing}>
                예
              </ModalButtonDanger>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* 2) 비밀번호 모달 */}
      {step === "PASSWORD" && (
        <ModalOverlay onClick={closeAll}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>비밀번호 확인</ModalTitle>
            <ModalDesc>회원 탈퇴를 진행하려면 비밀번호를 입력해주세요.</ModalDesc>

            <ModalInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleWithdraw();
              }}
              disabled={withdrawing}
              autoFocus
            />

            {withdrawError && <ErrorText>{withdrawError}</ErrorText>}

            <ModalActions>
              <ModalButton type="button" onClick={closeAll} disabled={withdrawing}>
                취소
              </ModalButton>
              <ModalButtonDanger type="button" onClick={handleWithdraw} disabled={withdrawing}>
                {withdrawing ? "처리 중..." : "탈퇴"}
              </ModalButtonDanger>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}



      {/* 3) 완료 화면 */}
      {step === "DONE" && (
        <ModalOverlay>
          <ModalBox>
            <SuccessBox>
              <ModalTitle>회원탈퇴가 완료되었습니다.</ModalTitle>
              <ModalDesc>이용해주셔서 감사합니다.</ModalDesc>

              <ModalActions>
                <ModalButtonDanger
                  type="button"
                  onClick={() => navigate("/", { replace: true })}
                >
                  홈으로
                </ModalButtonDanger>
              </ModalActions>
            </SuccessBox>
          </ModalBox>
        </ModalOverlay>
      )}
    </Page>
  );
}
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage } from "../../../../utils/apiClient";

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
} from "./MyProfileViewStyles";

function decodeJwtPayload(token) {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length < 2) return null;

    const base64Url = parts[1];
    if (!base64Url) return null;

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

  useEffect(() => {
    const loadMember = () => {
      const storedMemberInfo = authStorage.getMemberInfo?.();
      const normalizedStoredMember = normalizeMember(storedMemberInfo);

      if (normalizedStoredMember) {
        setMember(normalizedStoredMember);
        return;
      }

      const token = authStorage.getToken?.();
      const payload = token ? decodeJwtPayload(token) : null;
      setMember(normalizeMember(payload));
    };

    loadMember();

    const onAuthChanged = () => loadMember();
    window.addEventListener("storage", onAuthChanged);
    window.addEventListener("authChanged", onAuthChanged);
    return () => {
      window.removeEventListener("storage", onAuthChanged);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  const avatarFallbackInitial = useMemo(() => {
    return (member?.nickname || member?.name || member?.email || "U").trim().charAt(0).toUpperCase();
  }, [member]);

  const fallbackImageUrl = "https://placehold.co/160x160?text=USER";

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
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackImageUrl;
                }}
              />
            ) : (
              <AvatarFallback>{avatarFallbackInitial}</AvatarFallback>
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
    </Page>
  );
}

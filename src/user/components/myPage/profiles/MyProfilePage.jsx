import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { memberApi, authStorage } from "../../../../utils/api";
import { updateAuthUser } from "../../../../utils/auth";
import Modal from "../../modal/Modal";
import {
  Row,
  Label,
  Value,
  Btn,
  AvatarWrap,
  AvatarImg,
  SectionTitle,
} from "./myprofileStyles";

export default function MyProfilePage() {
  const navigate = useNavigate();

  // ✅ authStorage / localStorage에서 회원정보 읽기 (로그인 페이지 저장 방식에 맞춤)
  const readMemberInfo = () => {
    try {
      if (authStorage?.getMemberInfo) return authStorage.getMemberInfo();
      const raw = localStorage.getItem("memberInfo"); // login에서 저장한 키가 이거라면 OK
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const readAccessToken = () => {
    try {
      if (authStorage?.getToken) return authStorage.getToken();
      return localStorage.getItem("accessToken");
    } catch {
      return null;
    }
  };

  const [me, setMe] = useState(readMemberInfo());

  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [pendingField, setPendingField] = useState(null); // name|nickname|phone
  const [currentPassword, setCurrentPassword] = useState("");
  const [newValue, setNewValue] = useState("");

  // ✅ 로그인/로그아웃 후 같은 탭에서도 헤더/마이페이지 즉시 갱신되도록 동기화
  useEffect(() => {
    const sync = () => setMe(readMemberInfo());

    window.addEventListener("storage", sync); // 다른 탭 변경 감지
    window.addEventListener("authChanged", sync); // 같은 탭 갱신 이벤트

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("authChanged", sync);
    };
  }, []);

  // ✅ 토큰은 있는데 memberInfo만 비어있을 수도 있어서, 그때 다시 읽기 시도
  useEffect(() => {
    const token = readAccessToken();
    if (!me && token) setMe(readMemberInfo());
  }, [me]);

  // ✅ 로그인 안 됐으면 안내 + 로그인으로 보내기
  if (!me) {
    return (
      <div style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 8 }}>로그인이 필요합니다.</h3>
        <button onClick={() => navigate("/login")}>로그인 하러가기</button>
      </div>
    );
  }

  const openEdit = (field) => {
    setPendingField(field);
    setCurrentPassword("");
    setNewValue(
      field === "name"
        ? me.memberName || ""
        : field === "nickname"
        ? me.nickname || ""
        : me.phone || ""
    );
    setPwModalOpen(true);
  };

  const afterPwConfirm = () => {
    if (!currentPassword) return alert("비밀번호를 입력하세요.");
    setPwModalOpen(false);
    setEditModalOpen(true);
  };

  const save = async () => {
    try {
      if (pendingField === "name") {
        await memberApi.changeName(currentPassword, newValue);
        updateAuthUser({ memberName: newValue });
        setMe((p) => ({ ...p, memberName: newValue }));
      }

      if (pendingField === "nickname") {
        await memberApi.changeNickname(currentPassword, newValue);
        updateAuthUser({ nickname: newValue });
        setMe((p) => ({ ...p, nickname: newValue }));
      }

      if (pendingField === "phone") {
        await memberApi.changePhone(currentPassword, newValue);
        updateAuthUser({ phone: newValue });
        setMe((p) => ({ ...p, phone: newValue }));
      }

      // ✅ 저장 후 storage에도 반영 (로그인 유지 시 화면 깨짐 방지)
      const updated = {
        ...me,
        memberName: pendingField === "name" ? newValue : me.memberName,
        nickname: pendingField === "nickname" ? newValue : me.nickname,
        phone: pendingField === "phone" ? newValue : me.phone,
      };

      if (authStorage?.setMemberInfo) authStorage.setMemberInfo(updated);
      else localStorage.setItem("memberInfo", JSON.stringify(updated));

      // ✅ 같은 탭에서도 즉시 반영
      window.dispatchEvent(new Event("authChanged"));

      setEditModalOpen(false);
      alert("변경 완료!");
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "변경에 실패했습니다.";
      alert(msg);
      setEditModalOpen(false);
      setPwModalOpen(true);
    }
  };

  // ✅ placeholder DNS 문제 방지용 fallback(원하면 로컬 이미지로 교체 추천)
  const fallbackImg = "https://placehold.co/80x80?text=USER";

  return (
    <div>
      <SectionTitle>회원정보</SectionTitle>

      <AvatarWrap>
        <AvatarImg
          src={me.profileUrl || me.fileUrl || fallbackImg}
          alt="profile"
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />
      </AvatarWrap>

      <Row>
        <Label>이메일</Label>
        <Value>{me.email}</Value>
        <div />
      </Row>

      <Row>
        <Label>이름</Label>
        <Value>{me.memberName}</Value>
        <Btn onClick={() => openEdit("name")}>변경</Btn>
      </Row>

      <Row>
        <Label>닉네임</Label>
        <Value>{me.nickname}</Value>
        <Btn onClick={() => openEdit("nickname")}>변경</Btn>
      </Row>

      <Row>
        <Label>전화번호</Label>
        <Value>{me.phone}</Value>
        <Btn onClick={() => openEdit("phone")}>변경</Btn>
      </Row>

      {pwModalOpen && (
        <Modal onClose={() => setPwModalOpen(false)}>
          <h3>비밀번호 인증</h3>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호"
            style={{ width: "100%", padding: 12, marginTop: 12 }}
          />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setPwModalOpen(false)}>취소</button>
            <button onClick={afterPwConfirm}>확인</button>
          </div>
        </Modal>
      )}

      {editModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <h3>정보 수정</h3>
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="새 값 입력"
            style={{ width: "100%", padding: 12, marginTop: 12 }}
          />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setEditModalOpen(false)}>취소</button>
            <button onClick={save}>저장</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

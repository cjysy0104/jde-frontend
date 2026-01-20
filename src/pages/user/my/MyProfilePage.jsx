import React, { useState } from "react";
import { memberApi } from "../../../utils/api";
import { getUser, updateAuthUser } from "../../../utils/auth";
import Modal from "../components/modal/Modal"; 
import { Row, Label, Value, Btn, AvatarWrap, AvatarImg, SectionTitle } from "./profileStyles";

export default function MyProfilePage() {
  const [me, setMe] = useState(getUser());

  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [pendingField, setPendingField] = useState(null); // name|nickname|phone
  const [currentPassword, setCurrentPassword] = useState("");
  const [newValue, setNewValue] = useState("");

  if (!me) return <div>로그인이 필요합니다.</div>;

  const openEdit = (field) => {
    setPendingField(field);
    setCurrentPassword("");
    setNewValue(field === "name" ? me.memberName : field === "nickname" ? me.nickname : me.phone);
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

      setEditModalOpen(false);
      alert("변경 완료!");
    } catch (e) {
      alert(e.message);
      setEditModalOpen(false);
      setPwModalOpen(true);
    }
  };

  return (
    <div>
      <SectionTitle>회원정보</SectionTitle>

      <AvatarWrap>
        <AvatarImg src={me.fileUrl || "https://via.placeholder.com/80?text=USER"} alt="profile" />
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

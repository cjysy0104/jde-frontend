import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memberApi } from "../../../../utils/api";
import { authStorage } from "../../../../utils/apiClient";
import Modal from "../../modal/Modal";

import {
  Page,
  Row,
  Label,
  Value,
  Btn,
  SectionTitle,
  BigAvatarWrap,
  BigAvatar,
  ActionRow,
  PrimaryButton,
  ModalDesc,
  ModalInput,
  Hint,
  Split,
  Card,
  CardTitle,
  CardRow,
  HiddenFileInput,
  GhostButton,
  FileName,
  PreviewBox,
  PreviewImg,
  PreviewPlaceholder,
  Grid,
  Thumb,
  ThumbImg,
  ThumbMeta,
} from "./MyprofileStyles";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [defaultImages, setDefaultImages] = useState([]);
  const [defaultLoading, setDefaultLoading] = useState(false);

  const readMemberInfo = () => {
    try {
      return authStorage.getMemberInfo();
    } catch {
      return null;
    }
  };

  const readToken = () => {
    try {
      return authStorage.getToken();
    } catch {
      return null;
    }
  };

  const [me, setMe] = useState(readMemberInfo());

  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pendingField, setPendingField] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [newValue, setNewValue] = useState("");

  const [photoPwModalOpen, setPhotoPwModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoPassword, setPhotoPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState("");
  const [selectedDefault, setSelectedDefault] = useState(null);

  const [passPwModalOpen, setPassPwModalOpen] = useState(false);
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [passCurrentPassword, setPassCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);

  const fieldLabel = useMemo(() => {
    if (pendingField === "name") return "이름";
    if (pendingField === "nickname") return "닉네임";
    if (pendingField === "phone") return "전화번호";
    return "";
  }, [pendingField]);

  const currentFieldValue = useMemo(() => {
    if (!me) return "";
    if (pendingField === "name") return me.memberName || "";
    if (pendingField === "nickname") return me.nickname || "";
    if (pendingField === "phone") return me.phone || "";
    return "";
  }, [me, pendingField]);

  useEffect(() => {
    const sync = () => setMe(readMemberInfo());
    window.addEventListener("storage", sync);
    window.addEventListener("authChanged", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("authChanged", sync);
    };
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setUploadPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setUploadPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const fetchDefaultImages = async () => {
    setDefaultLoading(true);
    try {
      const res = await memberApi.getDefaultProfiles();
      const list = res?.result ?? res?.data?.result ?? res?.data ?? res ?? [];
      setDefaultImages(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error(e);
      setDefaultImages([]);
    } finally {
      setDefaultLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultImages();
  }, []);

  if (!me) {
    return (
      <div style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 8 }}>로그인이 필요합니다.</h3>
        <button type="button" onClick={() => navigate("/login")}>
          로그인 하러가기
        </button>
      </div>
    );
  }

  const closeAllModals = () => {
    setViewModalOpen(false);
    setPwModalOpen(false);
    setEditModalOpen(false);
    setPhotoPwModalOpen(false);
    setPhotoModalOpen(false);

    setPendingField(null);
    setCurrentPassword("");
    setVerifiedPassword("");
    setNewValue("");

    setPhotoPassword("");
    setSelectedFile(null);
    setSelectedDefault(null);
    setUploadPreviewUrl("");

    setPassPwModalOpen(false);
    setPassModalOpen(false);
    setPassCurrentPassword("");
    setNewPassword1("");
    setNewPassword2("");
  };

  const ensureAuth = () => {
    const token = readToken();
    if (!token) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const getErrorMessage = (e, fallback = "비밀번호가 일치하지 않습니다.") =>
    e?.message || fallback;

  const verifyPasswordOrThrow = async (password) => {
    if (!ensureAuth()) throw new Error("AUTH_REQUIRED");
    if (!password?.trim()) throw new Error("비밀번호를 입력하세요.");
    await memberApi.verifyPassword(password);
  };

  const openEdit = (field) => {
    setPendingField(field);
    setCurrentPassword("");
    setVerifiedPassword("");

    const preset =
      field === "name"
        ? me.memberName || ""
        : field === "nickname"
        ? me.nickname || ""
        : me.phone || "";

    setNewValue(preset);
    setPwModalOpen(true);
  };

  const afterPwConfirm = async () => {
    try {
      await verifyPasswordOrThrow(currentPassword);
      setVerifiedPassword(currentPassword);
      setPwModalOpen(false);
      setEditModalOpen(true);
    } catch (e) {
      const msg = e?.message === "AUTH_REQUIRED" ? null : getErrorMessage(e);
      if (msg) alert(msg);
    }
  };

  const saveInfo = async () => {
    try {
      if (!ensureAuth()) return;

      const trimmed = newValue?.trim();
      if (!trimmed) return alert("새 값을 입력하세요.");
      if (!verifiedPassword?.trim()) return alert("비밀번호 인증이 필요합니다.");

      if (pendingField === "name")
        await memberApi.changeName(verifiedPassword, trimmed);
      else if (pendingField === "nickname")
        await memberApi.changeNickname(verifiedPassword, trimmed);
      else if (pendingField === "phone")
        await memberApi.changePhone(verifiedPassword, trimmed);
      else return alert("수정할 항목이 선택되지 않았습니다.");

      const updated = {
        ...me,
        memberName: pendingField === "name" ? trimmed : me.memberName,
        nickname: pendingField === "nickname" ? trimmed : me.nickname,
        phone: pendingField === "phone" ? trimmed : me.phone,
      };

      authStorage.setMemberInfo(updated);
      setMe(updated);
      window.dispatchEvent(new Event("authChanged"));

      setEditModalOpen(false);
      alert("변경 완료!");
      navigate("/my/profile", { replace: true });
    } catch (e) {
      alert(e?.message || "변경에 실패했습니다.");
      setEditModalOpen(false);
      setPwModalOpen(true);
    }
  };

  const openPasswordModal = () => {
    setPassCurrentPassword("");
    setNewPassword1("");
    setNewPassword2("");
    setPassModalOpen(false);
    setPassPwModalOpen(true);
  };

  const afterPassPwConfirm = async () => {
    try {
      await verifyPasswordOrThrow(passCurrentPassword);
      setPassPwModalOpen(false);
      setPassModalOpen(true);
    } catch (e) {
      const msg = e?.message === "AUTH_REQUIRED" ? null : getErrorMessage(e);
      if (msg) alert(msg);
    }
  };

  const applyPasswordChange = async () => {
    try {
      if (!ensureAuth()) return;
      if (!passCurrentPassword?.trim()) return alert("현재 비밀번호를 입력하세요.");
      if (!newPassword1?.trim()) return alert("새 비밀번호를 입력하세요.");
      if (!newPassword2?.trim()) return alert("새 비밀번호 확인을 입력하세요.");
      if (newPassword1 !== newPassword2)
        return alert("새 비밀번호와 확인이 일치하지 않습니다.");

      await memberApi.changePassword(passCurrentPassword, newPassword1);

      setPassModalOpen(false);
      alert("비밀번호가 변경되었습니다.");
      navigate("/my/profile", { replace: true });
    } catch (e) {
      alert(e?.message || "비밀번호 변경에 실패했습니다.");
    }
  };

  const openPhotoModal = () => {
    setPhotoPassword("");
    setSelectedFile(null);
    setSelectedDefault(null);
    setUploadPreviewUrl("");
    setPhotoModalOpen(false);
    setPhotoPwModalOpen(true);
  };

  const afterPhotoPwConfirm = async () => {
    try {
      await verifyPasswordOrThrow(photoPassword);
      setPhotoPwModalOpen(false);
      setPhotoModalOpen(true);
    } catch (e) {
      const msg = e?.message === "AUTH_REQUIRED" ? null : getErrorMessage(e);
      if (msg) alert(msg);
    }
  };

  const triggerFilePick = () => fileInputRef.current?.click();

  const cacheBust = (url) =>
    url ? `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}` : "";

  const pickUrl = (res) =>
    res?.data ||
    res?.result?.profileUrl ||
    res?.result?.fileUrl ||
    res?.result?.url ||
    res?.profileUrl ||
    res?.fileUrl ||
    res?.url ||
    "";

  const applyUpload = async () => {
    try {
      if (!ensureAuth()) return;
      if (!photoPassword?.trim()) return alert("비밀번호를 입력하세요.");
      if (!selectedFile) return alert("업로드할 파일을 선택하세요.");

      const uploadRes = await memberApi.uploadProfileImage(
        photoPassword,
        selectedFile
      );
      const uploadUrl = pickUrl(uploadRes);
      if (!uploadUrl) return alert("업로드는 됐는데 프로필 URL을 받지 못했습니다.");

      const finalUrl = cacheBust(uploadUrl);
      const updated = { ...me, profileUrl: finalUrl, fileUrl: finalUrl };

      authStorage.setMemberInfo(updated);
      setMe(updated);
      window.dispatchEvent(new Event("authChanged"));

      setPhotoModalOpen(false);
      alert("프로필 사진이 변경되었습니다!");
      navigate("/my/profile", { replace: true });
    } catch (e) {
      alert(e?.message || "프로필 사진 변경에 실패했습니다.");
    }
  };

  const applyDefault = async () => {
    try {
      if (!ensureAuth()) return;
      if (!photoPassword?.trim()) return alert("비밀번호를 입력하세요.");
      if (!selectedDefault?.fileNo) return alert("기본 이미지를 선택하세요.");

      const res = await memberApi.changeProfileToDefault(
        photoPassword,
        selectedDefault.fileNo
      );
      const urlFromServer = pickUrl(res) || selectedDefault.fileUrl;
      const finalUrl = cacheBust(urlFromServer);

      const updated = { ...me, profileUrl: finalUrl, fileUrl: finalUrl };
      authStorage.setMemberInfo(updated);
      setMe(updated);
      window.dispatchEvent(new Event("authChanged"));

      setPhotoModalOpen(false);
      alert("기본 이미지로 변경되었습니다!");
      navigate("/my/profile", { replace: true });
    } catch (e) {
      alert(e?.message || "기본 이미지 변경에 실패했습니다.");
    }
  };

  const primaryPhotoAction = () => {
    if (selectedFile) return applyUpload();
    if (selectedDefault) return applyDefault();
    alert("업로드 파일을 선택하거나 기본 이미지를 선택하세요.");
  };

  const fallbackImg = "https://placehold.co/160x160?text=USER";

  return (
    <Page>
      <SectionTitle>회원정보</SectionTitle>

      <BigAvatarWrap>
        <BigAvatar
          src={me.profileUrl || me.fileUrl || fallbackImg}
          alt="profile"
          onError={(e) => (e.currentTarget.src = fallbackImg)}
          onClick={() => setViewModalOpen(true)}
          title="클릭해서 크게 보기"
          style={{ cursor: "zoom-in" }}
        />
      </BigAvatarWrap>

      <ActionRow style={{ gap: 10 }}>
        <PrimaryButton type="button" onClick={openPhotoModal}>
          프로필 사진 변경
        </PrimaryButton>

        <PrimaryButton type="button" onClick={openPasswordModal}>
          비밀번호 변경
        </PrimaryButton>
      </ActionRow>

      <Row>
        <Label>이메일</Label>
        <Value>{me.email}</Value>
        <div />
      </Row>

      <Row>
        <Label>이름</Label>
        <Value>{me.memberName}</Value>
        <Btn type="button" onClick={() => openEdit("name")}>
          변경
        </Btn>
      </Row>

      <Row>
        <Label>닉네임</Label>
        <Value>{me.nickname}</Value>
        <Btn type="button" onClick={() => openEdit("nickname")}>
          변경
        </Btn>
      </Row>

      <Row>
        <Label>전화번호</Label>
        <Value>{me.phone}</Value>
        <Btn type="button" onClick={() => openEdit("phone")}>
          변경
        </Btn>
      </Row>

      {pwModalOpen && (
        <Modal
          title="비밀번호 인증"
          onClose={closeAllModals}
          primaryText="확인"
          cancelText="취소"
          onPrimary={afterPwConfirm}
        >
          <ModalDesc>
            {fieldLabel
              ? `${fieldLabel} 변경을 위해 비밀번호를 입력하세요.`
              : "비밀번호를 입력하세요."}
          </ModalDesc>
          <ModalInput
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호"
          />
          <Hint>Enter: 확인 · ESC: 닫기</Hint>
        </Modal>
      )}

      {editModalOpen && (
        <Modal
          title={`${fieldLabel} 수정`}
          onClose={closeAllModals}
          primaryText="저장"
          cancelText="취소"
          onPrimary={saveInfo}
        >
          <ModalDesc>
            현재 값: <b>{currentFieldValue || "-"}</b>
          </ModalDesc>
          <ModalInput
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="새 값 입력"
          />
          <Hint>Enter: 저장 · ESC: 닫기</Hint>
        </Modal>
      )}

      {photoPwModalOpen && (
        <Modal
          title="비밀번호 인증"
          onClose={closeAllModals}
          primaryText="확인"
          cancelText="취소"
          onPrimary={afterPhotoPwConfirm}
          maxWidth={560}
        >
          <ModalDesc>프로필 사진 변경을 위해 비밀번호를 입력하세요.</ModalDesc>
          <ModalInput
            type="password"
            value={photoPassword}
            onChange={(e) => setPhotoPassword(e.target.value)}
            placeholder="현재 비밀번호"
          />
          <Hint>Enter: 확인 · ESC: 닫기</Hint>
        </Modal>
      )}

      {passPwModalOpen && (
        <Modal
          title="비밀번호 인증"
          onClose={closeAllModals}
          primaryText="확인"
          cancelText="취소"
          onPrimary={afterPassPwConfirm}
          maxWidth={560}
        >
          <ModalDesc>비밀번호 변경을 위해 현재 비밀번호를 입력하세요.</ModalDesc>
          <ModalInput
            type="password"
            value={passCurrentPassword}
            onChange={(e) => setPassCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호"
          />
          <Hint>Enter: 확인 · ESC: 닫기</Hint>
        </Modal>
      )}

      {passModalOpen && (
        <Modal
          title="비밀번호 변경"
          onClose={closeAllModals}
          primaryText="변경"
          cancelText="취소"
          onPrimary={applyPasswordChange}
          maxWidth={560}
        >
          <ModalDesc>새 비밀번호를 입력하고 확인까지 진행하세요.</ModalDesc>

          <ModalInput
            type="password"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            placeholder="새 비밀번호"
            style={{ marginBottom: 10 }}
          />

          <ModalInput
            type="password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            placeholder="새 비밀번호 확인"
          />

          <Hint>Enter: 변경 · ESC: 닫기</Hint>
        </Modal>
      )}

      {photoModalOpen && (
        <Modal
          title="프로필 사진 변경"
          onClose={closeAllModals}
          primaryText={selectedFile ? "업로드 저장" : "적용"}
          cancelText="닫기"
          onPrimary={primaryPhotoAction}
          maxWidth={860}
        >
          <ModalDesc>업로드/기본 중 하나 선택</ModalDesc>

          <Split>
            <Card>
              <CardTitle>업로드로 변경</CardTitle>

              <HiddenFileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setSelectedFile(f);
                  if (f) setSelectedDefault(null);
                }}
                style={{ display: "none" }}
              />

              <CardRow>
                <GhostButton type="button" onClick={triggerFilePick}>
                  파일 선택
                </GhostButton>
                <FileName>
                  {selectedFile ? selectedFile.name : "선택된 파일 없음"}
                </FileName>
              </CardRow>

              <PreviewBox style={{ height: 200 }}>
                {uploadPreviewUrl ? (
                  <PreviewImg src={uploadPreviewUrl} alt="upload preview" />
                ) : (
                  <PreviewPlaceholder>업로드 미리보기</PreviewPlaceholder>
                )}
              </PreviewBox>
            </Card>

            <Card>
              <CardTitle>
                기본 이미지로 변경
                {defaultLoading ? (
                  <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.7 }}>
                    불러오는 중...
                  </span>
                ) : null}
              </CardTitle>

              <Grid>
                {defaultImages.map((img) => {
                  const isSelected = selectedDefault?.fileNo === img.fileNo;
                  return (
                    <Thumb
                      key={img.fileNo}
                      type="button"
                      $active={isSelected}
                      onClick={() => {
                        setSelectedDefault(img);
                        setSelectedFile(null);
                        setUploadPreviewUrl("");
                      }}
                      title={`${img.fileName} (#${img.fileNo})`}
                    >
                      <ThumbImg src={img.fileUrl} alt={img.fileName} />
                      <ThumbMeta>
                        <span>{img.fileName}</span>
                        <small>#{img.fileNo}</small>
                      </ThumbMeta>
                    </Thumb>
                  );
                })}
              </Grid>

              <PreviewBox style={{ marginTop: 10, height: 200 }}>
                {selectedDefault ? (
                  <PreviewImg
                    src={selectedDefault.fileUrl}
                    alt="default preview"
                  />
                ) : (
                  <PreviewPlaceholder>기본 이미지 미리보기</PreviewPlaceholder>
                )}
              </PreviewBox>
            </Card>
          </Split>

          <Hint>
            Enter:{" "}
            {selectedFile
              ? "업로드 저장"
              : selectedDefault
              ? "기본 적용"
              : "선택 필요"}{" "}
            · ESC: 닫기
          </Hint>
        </Modal>
      )}

      {viewModalOpen && (
        <Modal
          title="프로필 원본 보기"
          onClose={() => setViewModalOpen(false)}
          onPrimary={() => setViewModalOpen(false)}
          primaryText="확인"
          cancelText={null}
          maxWidth={700}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={me.profileUrl || me.fileUrl || fallbackImg}
              alt="원본"
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "contain",
                maxHeight: "70vh",
              }}
              onClick={() => setViewModalOpen(false)}
            />
          </div>
        </Modal>
      )}
    </Page>
  );
}

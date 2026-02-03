import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
} from "./myprofileStyles";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ===== 기본 이미지 목록 =====
  const [defaultImageList, setDefaultImageList] = useState([]);
  const [isDefaultImageLoading, setIsDefaultImageLoading] = useState(false);

  const readMemberInfoFromStorage = useCallback(() => {
    try {
      return authStorage.getMemberInfo();
    } catch {
      return null;
    }
  }, []);

  const readTokenFromStorage = useCallback(() => {
    try {
      return authStorage.getToken();
    } catch {
      return null;
    }
  }, []);

  const [currentMemberInfo, setCurrentMemberInfo] = useState(() => readMemberInfoFromStorage());

  // ===== 공통 모달 닫기 =====
  const [isProfileViewModalOpen, setIsProfileViewModalOpen] = useState(false);

  // ===== 회원정보 변경 =====
  const [isPasswordVerifyModalOpen, setIsPasswordVerifyModalOpen] = useState(false);
  const [isEditFieldModalOpen, setIsEditFieldModalOpen] = useState(false);
  const [pendingEditField, setPendingEditField] = useState(null); // "name" | "nickname" | "phone" | null
  const [passwordForFieldEdit, setPasswordForFieldEdit] = useState("");
  const [verifiedPasswordForFieldEdit, setVerifiedPasswordForFieldEdit] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  // ===== 프로필 사진 변경 =====
  const [isPhotoPasswordVerifyModalOpen, setIsPhotoPasswordVerifyModalOpen] = useState(false);
  const [isPhotoChangeModalOpen, setIsPhotoChangeModalOpen] = useState(false);
  const [passwordForPhotoChange, setPasswordForPhotoChange] = useState("");
  const [selectedUploadFile, setSelectedUploadFile] = useState(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState("");
  const [selectedDefaultImage, setSelectedDefaultImage] = useState(null);

  // ===== 비밀번호 변경 =====
  const [isPasswordChangeVerifyModalOpen, setIsPasswordChangeVerifyModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);
  const [currentPasswordForPasswordChange, setCurrentPasswordForPasswordChange] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [newPasswordConfirmValue, setNewPasswordConfirmValue] = useState("");

  // ===== 파생값 =====
  const editFieldLabel = useMemo(() => {
    if (pendingEditField === "name") return "이름";
    if (pendingEditField === "nickname") return "닉네임";
    if (pendingEditField === "phone") return "전화번호";
    return "";
  }, [pendingEditField]);

  const currentEditFieldValue = useMemo(() => {
    if (!currentMemberInfo) return "";
    if (pendingEditField === "name") return currentMemberInfo.memberName || "";
    if (pendingEditField === "nickname") return currentMemberInfo.nickname || "";
    if (pendingEditField === "phone") return currentMemberInfo.phone || "";
    return "";
  }, [currentMemberInfo, pendingEditField]);

  // ===== 저장소 변경 =====
  useEffect(() => {
    const syncMemberInfo = () => setCurrentMemberInfo(readMemberInfoFromStorage());
    window.addEventListener("storage", syncMemberInfo);
    window.addEventListener("authChanged", syncMemberInfo);
    return () => {
      window.removeEventListener("storage", syncMemberInfo);
      window.removeEventListener("authChanged", syncMemberInfo);
    };
  }, [readMemberInfoFromStorage]);

  // ===== 업로드 미리보기 =====
  useEffect(() => {
    if (!selectedUploadFile) {
      setUploadPreviewUrl("");
      return;
    }
    const createdObjectUrl = URL.createObjectURL(selectedUploadFile);
    setUploadPreviewUrl(createdObjectUrl);
    return () => URL.revokeObjectURL(createdObjectUrl);
  }, [selectedUploadFile]);

  // ===== 기본이미지 목록 로딩 =====
  const fetchDefaultImageList = useCallback(async () => {
    setIsDefaultImageLoading(true);
    try {
      const response = await memberApi.getDefaultProfiles();
      const list = response?.result ?? response?.data?.result ?? response?.data ?? response ?? [];
      setDefaultImageList(Array.isArray(list) ? list : []);
    } catch {
      setDefaultImageList([]);
    } finally {
      setIsDefaultImageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefaultImageList();
  }, [fetchDefaultImageList]);

  // ===== 로그인 체크 =====
  if (!currentMemberInfo) {
    return (
      <div style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 8 }}>로그인이 필요합니다.</h3>
        <button type="button" onClick={() => navigate("/login")}>
          로그인 하러가기
        </button>
      </div>
    );
  }

  // ===== 공통 유틸 =====
  const closeAllModals = () => {
    setIsProfileViewModalOpen(false);

    setIsPasswordVerifyModalOpen(false);
    setIsEditFieldModalOpen(false);
    setPendingEditField(null);
    setPasswordForFieldEdit("");
    setVerifiedPasswordForFieldEdit("");
    setNewFieldValue("");

    setIsPhotoPasswordVerifyModalOpen(false);
    setIsPhotoChangeModalOpen(false);
    setPasswordForPhotoChange("");
    setSelectedUploadFile(null);
    setSelectedDefaultImage(null);
    setUploadPreviewUrl("");

    setIsPasswordChangeVerifyModalOpen(false);
    setIsPasswordChangeModalOpen(false);
    setCurrentPasswordForPasswordChange("");
    setNewPasswordValue("");
    setNewPasswordConfirmValue("");
  };

  const ensureAuthenticatedOrRedirect = () => {
    const token = readTokenFromStorage();
    if (!token) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const verifyPasswordOrThrow = async (password) => {
    if (!ensureAuthenticatedOrRedirect()) throw new Error("AUTH_REQUIRED");
    if (!password?.trim()) throw new Error("비밀번호를 입력하세요.");
    await memberApi.verifyPassword(password);
  };

  const updateLocalMemberInfoAndBroadcast = (updatedMemberInfo) => {
    authStorage.setMemberInfo(updatedMemberInfo);
    setCurrentMemberInfo(updatedMemberInfo);
    window.dispatchEvent(new Event("authChanged"));
  };

  const cacheBustUrl = (url) => (url ? `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}` : "");

  const pickProfileUrlFromResponse = (response) =>
    response?.data ||
    response?.result?.profileUrl ||
    response?.result?.fileUrl ||
    response?.result?.url ||
    response?.profileUrl ||
    response?.fileUrl ||
    response?.url ||
    "";

  // ===== 회원정보 변경 =====
  const openEditFieldFlow = (field) => {
    setPendingEditField(field);
    setPasswordForFieldEdit("");
    setVerifiedPasswordForFieldEdit("");

    const presetValue =
      field === "name"
        ? currentMemberInfo.memberName || ""
        : field === "nickname"
        ? currentMemberInfo.nickname || ""
        : currentMemberInfo.phone || "";

    setNewFieldValue(presetValue);
    setIsPasswordVerifyModalOpen(true);
  };

  const confirmPasswordForFieldEdit = async () => {
    try {
      await verifyPasswordOrThrow(passwordForFieldEdit);
      setVerifiedPasswordForFieldEdit(passwordForFieldEdit);
      setIsPasswordVerifyModalOpen(false);
      setIsEditFieldModalOpen(true);
    } catch (error) {
      if (error?.message !== "AUTH_REQUIRED") alert(error?.message || "비밀번호가 일치하지 않습니다.");
    }
  };

  const applyFieldEdit = async () => {
    try {
      if (!ensureAuthenticatedOrRedirect()) return;

      const trimmedValue = newFieldValue?.trim();
      if (!trimmedValue) return alert("새 값을 입력하세요.");
      if (!verifiedPasswordForFieldEdit?.trim()) return alert("비밀번호 인증이 필요합니다.");

      if (pendingEditField === "name") await memberApi.changeName(verifiedPasswordForFieldEdit, trimmedValue);
      else if (pendingEditField === "nickname")
        await memberApi.changeNickname(verifiedPasswordForFieldEdit, trimmedValue);
      else if (pendingEditField === "phone") await memberApi.changePhone(verifiedPasswordForFieldEdit, trimmedValue);
      else return alert("수정할 항목이 선택되지 않았습니다.");

      const updatedMemberInfo = {
        ...currentMemberInfo,
        memberName: pendingEditField === "name" ? trimmedValue : currentMemberInfo.memberName,
        nickname: pendingEditField === "nickname" ? trimmedValue : currentMemberInfo.nickname,
        phone: pendingEditField === "phone" ? trimmedValue : currentMemberInfo.phone,
      };

      updateLocalMemberInfoAndBroadcast(updatedMemberInfo);

      setIsEditFieldModalOpen(false);
      alert("변경 완료!");
      navigate("/my/profile", { replace: true });
    } catch (error) {
      alert(error?.message || "변경에 실패했습니다.");
      setIsEditFieldModalOpen(false);
      setIsPasswordVerifyModalOpen(true);
    }
  };

  // ===== 비밀번호 변경 =====
  const openPasswordChangeFlow = () => {
    setCurrentPasswordForPasswordChange("");
    setNewPasswordValue("");
    setNewPasswordConfirmValue("");
    setIsPasswordChangeModalOpen(false);
    setIsPasswordChangeVerifyModalOpen(true);
  };

  const confirmPasswordForPasswordChange = async () => {
    try {
      await verifyPasswordOrThrow(currentPasswordForPasswordChange);
      setIsPasswordChangeVerifyModalOpen(false);
      setIsPasswordChangeModalOpen(true);
    } catch (error) {
      if (error?.message !== "AUTH_REQUIRED") alert(error?.message || "비밀번호가 일치하지 않습니다.");
    }
  };

  const applyPasswordChange = async () => {
    try {
      if (!ensureAuthenticatedOrRedirect()) return;

      if (!currentPasswordForPasswordChange?.trim()) return alert("현재 비밀번호를 입력하세요.");
      if (!newPasswordValue?.trim()) return alert("새 비밀번호를 입력하세요.");
      if (!newPasswordConfirmValue?.trim()) return alert("새 비밀번호 확인을 입력하세요.");
      if (newPasswordValue !== newPasswordConfirmValue) return alert("새 비밀번호와 확인이 일치하지 않습니다.");

      await memberApi.changePassword(currentPasswordForPasswordChange, newPasswordValue);

      setIsPasswordChangeModalOpen(false);
      alert("비밀번호가 변경되었습니다.");
      navigate("/my/profile", { replace: true });
    } catch (error) {
      alert(error?.message || "비밀번호 변경에 실패했습니다.");
    }
  };

  // ===== 프로필 사진 변경 =====
  const openPhotoChangeFlow = () => {
    setPasswordForPhotoChange("");
    setSelectedUploadFile(null);
    setSelectedDefaultImage(null);
    setUploadPreviewUrl("");
    setIsPhotoChangeModalOpen(false);
    setIsPhotoPasswordVerifyModalOpen(true);
  };

  const confirmPasswordForPhotoChange = async () => {
    try {
      await verifyPasswordOrThrow(passwordForPhotoChange);
      setIsPhotoPasswordVerifyModalOpen(false);
      setIsPhotoChangeModalOpen(true);
    } catch (error) {
      if (error?.message !== "AUTH_REQUIRED") alert(error?.message || "비밀번호가 일치하지 않습니다.");
    }
  };

  const triggerUploadFilePicker = () => fileInputRef.current?.click();

  const applyUploadedProfileImage = async () => {
    try {
      if (!ensureAuthenticatedOrRedirect()) return;
      if (!passwordForPhotoChange?.trim()) return alert("비밀번호를 입력하세요.");
      if (!selectedUploadFile) return alert("업로드할 파일을 선택하세요.");

      const uploadResponse = await memberApi.uploadProfileImage(passwordForPhotoChange, selectedUploadFile);
      const uploadedUrl = pickProfileUrlFromResponse(uploadResponse);
      if (!uploadedUrl) return alert("업로드는 됐는데 프로필 URL을 받지 못했습니다.");

      const finalUrl = cacheBustUrl(uploadedUrl);
      const updatedMemberInfo = { ...currentMemberInfo, profileUrl: finalUrl, fileUrl: finalUrl };

      updateLocalMemberInfoAndBroadcast(updatedMemberInfo);

      setIsPhotoChangeModalOpen(false);
      alert("프로필 사진이 변경되었습니다!");
      navigate("/my/profile", { replace: true });
    } catch (error) {
      alert(error?.message || "프로필 사진 변경에 실패했습니다.");
    }
  };

  const applyDefaultProfileImage = async () => {
    try {
      if (!ensureAuthenticatedOrRedirect()) return;
      if (!passwordForPhotoChange?.trim()) return alert("비밀번호를 입력하세요.");
      if (!selectedDefaultImage?.fileNo) return alert("기본 이미지를 선택하세요.");

      const response = await memberApi.changeProfileToDefault(passwordForPhotoChange, selectedDefaultImage.fileNo);
      const urlFromServer = pickProfileUrlFromResponse(response) || selectedDefaultImage.fileUrl;
      const finalUrl = cacheBustUrl(urlFromServer);

      const updatedMemberInfo = { ...currentMemberInfo, profileUrl: finalUrl, fileUrl: finalUrl };
      updateLocalMemberInfoAndBroadcast(updatedMemberInfo);

      setIsPhotoChangeModalOpen(false);
      alert("기본 이미지로 변경되었습니다!");
      navigate("/my/profile", { replace: true });
    } catch (error) {
      alert(error?.message || "기본 이미지 변경에 실패했습니다.");
    }
  };

  const applyProfilePhotoChange = () => {
    if (selectedUploadFile) return applyUploadedProfileImage();
    if (selectedDefaultImage) return applyDefaultProfileImage();
    alert("업로드 파일을 선택하거나 기본 이미지를 선택하세요.");
  };

  const fallbackProfileImageUrl = "https://placehold.co/160x160?text=USER";

  return (
    <Page>
      <SectionTitle>회원정보</SectionTitle>

      <BigAvatarWrap>
        <BigAvatar
          src={currentMemberInfo.profileUrl || currentMemberInfo.fileUrl || fallbackProfileImageUrl}
          alt="profile"
          onError={(e) => (e.currentTarget.src = fallbackProfileImageUrl)}
          onClick={() => setIsProfileViewModalOpen(true)}
          title="클릭해서 크게 보기"
          style={{ cursor: "zoom-in" }}
        />
      </BigAvatarWrap>

      <ActionRow style={{ gap: 10 }}>
        <PrimaryButton type="button" onClick={openPhotoChangeFlow}>
          프로필 사진 변경
        </PrimaryButton>

        <PrimaryButton type="button" onClick={openPasswordChangeFlow}>
          비밀번호 변경
        </PrimaryButton>
      </ActionRow>

      <Row>
        <Label>이메일</Label>
        <Value>{currentMemberInfo.email}</Value>
        <div />
      </Row>

      <Row>
        <Label>이름</Label>
        <Value>{currentMemberInfo.memberName}</Value>
        <Btn type="button" onClick={() => openEditFieldFlow("name")}>
          변경
        </Btn>
      </Row>

      <Row>
        <Label>닉네임</Label>
        <Value>{currentMemberInfo.nickname}</Value>
        <Btn type="button" onClick={() => openEditFieldFlow("nickname")}>
          변경
        </Btn>
      </Row>

      <Row>
        <Label>전화번호</Label>
        <Value>{currentMemberInfo.phone}</Value>
        <Btn type="button" onClick={() => openEditFieldFlow("phone")}>
          변경
        </Btn>
      </Row>

      {isPasswordVerifyModalOpen && (
        <Modal
          title="비밀번호 인증"
          onClose={closeAllModals}
          primaryText="확인"
          cancelText="취소"
          onPrimary={confirmPasswordForFieldEdit}
        >
          <ModalDesc>
            {editFieldLabel ? `${editFieldLabel} 변경을 위해 비밀번호를 입력하세요.` : "비밀번호를 입력하세요."}
          </ModalDesc>
          <ModalInput
            type="password"
            value={passwordForFieldEdit}
            onChange={(e) => setPasswordForFieldEdit(e.target.value)}
            placeholder="현재 비밀번호"
          />
          <Hint>Enter: 확인 · ESC: 닫기</Hint>
        </Modal>
      )}

      {isEditFieldModalOpen && (
        <Modal
          title={`${editFieldLabel} 수정`}
          onClose={closeAllModals}
          primaryText="저장"
          cancelText="취소"
          onPrimary={applyFieldEdit}
        >
          <ModalDesc>
            현재 값: <b>{currentEditFieldValue || "-"}</b>
          </ModalDesc>
          <ModalInput
            value={newFieldValue}
            onChange={(e) => setNewFieldValue(e.target.value)}
            placeholder="새 값 입력"
          />
          <Hint>Enter: 저장 · ESC: 닫기</Hint>
        </Modal>
      )}

      {isPhotoPasswordVerifyModalOpen && (
        <Modal
          title="비밀번호 인증"
          onClose={closeAllModals}
          primaryText="확인"
          cancelText="취소"
          onPrimary={confirmPasswordForPhotoChange}
          maxWidth={560}
        >
          <ModalDesc>프로필 사진 변경을 위해 비밀번호를 입력하세요.</ModalDesc>
          <ModalInput
            type="password"
            value={passwordForPhotoChange}
            onChange={(e) => setPasswordForPhotoChange(e.target.value)}
            placeholder="현재 비밀번호"
          />
          <Hint>Enter: 확인 · ESC: 닫기</Hint>
        </Modal>
      )}

      {isPasswordChangeVerifyModalOpen && (
        <Modal
          title="비밀번호 인증"
          onClose={closeAllModals}
          primaryText="확인"
          cancelText="취소"
          onPrimary={confirmPasswordForPasswordChange}
          maxWidth={560}
        >
          <ModalDesc>비밀번호 변경을 위해 현재 비밀번호를 입력하세요.</ModalDesc>
          <ModalInput
            type="password"
            value={currentPasswordForPasswordChange}
            onChange={(e) => setCurrentPasswordForPasswordChange(e.target.value)}
            placeholder="현재 비밀번호"
          />
          <Hint>Enter: 확인 · ESC: 닫기</Hint>
        </Modal>
      )}

      {isPasswordChangeModalOpen && (
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
            value={newPasswordValue}
            onChange={(e) => setNewPasswordValue(e.target.value)}
            placeholder="새 비밀번호"
            style={{ marginBottom: 10 }}
          />

          <ModalInput
            type="password"
            value={newPasswordConfirmValue}
            onChange={(e) => setNewPasswordConfirmValue(e.target.value)}
            placeholder="새 비밀번호 확인"
          />

          <Hint>Enter: 변경 · ESC: 닫기</Hint>
        </Modal>
      )}

      {isPhotoChangeModalOpen && (
        <Modal
          title="프로필 사진 변경"
          onClose={closeAllModals}
          primaryText={selectedUploadFile ? "업로드 저장" : "적용"}
          cancelText="닫기"
          onPrimary={applyProfilePhotoChange}
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
                  const pickedFile = e.target.files?.[0] || null;
                  setSelectedUploadFile(pickedFile);
                  if (pickedFile) setSelectedDefaultImage(null);
                }}
                style={{ display: "none" }}
              />

              <CardRow>
                <GhostButton type="button" onClick={triggerUploadFilePicker}>
                  파일 선택
                </GhostButton>
                <FileName>{selectedUploadFile ? selectedUploadFile.name : "선택된 파일 없음"}</FileName>
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
                {isDefaultImageLoading ? (
                  <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.7 }}>불러오는 중...</span>
                ) : null}
              </CardTitle>

              <Grid>
                {defaultImageList.map((defaultImage) => {
                  const isSelected = selectedDefaultImage?.fileNo === defaultImage.fileNo;
                  return (
                    <Thumb
                      key={defaultImage.fileNo}
                      type="button"
                      $active={isSelected}
                      onClick={() => {
                        setSelectedDefaultImage(defaultImage);
                        setSelectedUploadFile(null);
                        setUploadPreviewUrl("");
                      }}
                      title={`${defaultImage.fileName} (#${defaultImage.fileNo})`}
                    >
                      <ThumbImg src={defaultImage.fileUrl} alt={defaultImage.fileName} />
                      <ThumbMeta>
                        <span>{defaultImage.fileName}</span>
                        <small>#{defaultImage.fileNo}</small>
                      </ThumbMeta>
                    </Thumb>
                  );
                })}
              </Grid>

              <PreviewBox style={{ marginTop: 10, height: 200 }}>
                {selectedDefaultImage ? (
                  <PreviewImg src={selectedDefaultImage.fileUrl} alt="default preview" />
                ) : (
                  <PreviewPlaceholder>기본 이미지 미리보기</PreviewPlaceholder>
                )}
              </PreviewBox>
            </Card>
          </Split>

          <Hint>
            Enter:{" "}
            {selectedUploadFile ? "업로드 저장" : selectedDefaultImage ? "기본 적용" : "선택 필요"} · ESC: 닫기
          </Hint>
        </Modal>
      )}

      {isProfileViewModalOpen && (
        <Modal
          title="프로필 원본 보기"
          onClose={() => setIsProfileViewModalOpen(false)}
          onPrimary={() => setIsProfileViewModalOpen(false)}
          primaryText="확인"
          cancelText={null}
          maxWidth={700}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={currentMemberInfo.profileUrl || currentMemberInfo.fileUrl || fallbackProfileImageUrl}
              alt="원본"
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "contain",
                maxHeight: "70vh",
              }}
              onClick={() => setIsProfileViewModalOpen(false)}
            />
          </div>
        </Modal>
      )}
    </Page>
  );
}

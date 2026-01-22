import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memberApi, authStorage } from "../../../../utils/api";
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
  Badge,
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
  CardActions,
  MiniPrimary,
  Grid,
  Thumb,
  ThumbImg,
  ThumbMeta,
} from "./MyprofileStyles";

/**
 * 기본이미지 목록 (DB 캡쳐 기준 임시 하드코딩)
 * 나중에 백엔드 API로 교체하면 됨.
 */
const DEFAULT_IMAGES = [
  {
    fileNo: 14,
    fileName: "rabbit",
    fileUrl:
      "https://kh-yogurt.s3.ap-southeast-2.amazonaws.com/DefaultImage/JDE_20260119163533_9ba8d90f56e34900b9bf187f51edcf8e.png",
  },
  {
    fileNo: 11,
    fileName: "bear",
    fileUrl:
      "https://kh-yogurt.s3.ap-southeast-2.amazonaws.com/DefaultImage/JDE_20260119141936_3505be05ec8044db8eb62c4de9bed572.png",
  },
  {
    fileNo: 12,
    fileName: "deer",
    fileUrl:
      "https://kh-yogurt.s3.ap-southeast-2.amazonaws.com/DefaultImage/JDE_20260119141957_0d50a96a08f347b49bd2de69bde73f77.png",
  },
  {
    fileNo: 13,
    fileName: "frog",
    fileUrl:
      "https://kh-yogurt.s3.ap-southeast-2.amazonaws.com/DefaultImage/JDE_20260119142015_ce8fa8d1caba46b685459b6a6a5b5c31.png",
  },
  {
    fileNo: 9,
    fileName: "tiger",
    fileUrl:
      "https://kh-yogurt.s3.ap-southeast-2.amazonaws.com/DefaultImage/JDE_20260119123107_8bac6834252e4558b974499fa6a4107c.png",
  },
  {
    fileNo: 10,
    fileName: "penguin",
    fileUrl:
      "https://kh-yogurt.s3.ap-southeast-2.amazonaws.com/DefaultImage/JDE_20260119141150_f6a198feb4f84adeb1806938cce9ddc7.png",
  },
];

export default function MyProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  // ===== 정보 변경(비번→값) =====
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pendingField, setPendingField] = useState(null); // "name" | "nickname" | "phone"
  const [currentPassword, setCurrentPassword] = useState("");
  const [newValue, setNewValue] = useState("");

  // ===== 프로필 사진 변경 모달 =====
  const [photoPwModalOpen, setPhotoPwModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoPassword, setPhotoPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState("");
  const [selectedDefault, setSelectedDefault] = useState(null); // {fileNo,fileName,fileUrl}

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

  // localStorage 동기화
  useEffect(() => {
    const sync = () => setMe(readMemberInfo());
    window.addEventListener("storage", sync);
    window.addEventListener("authChanged", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("authChanged", sync);
    };
  }, []);

  // 업로드 미리보기 URL 관리 (blob URL)
  useEffect(() => {
    if (!selectedFile) {
      setUploadPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setUploadPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

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
    setPwModalOpen(false);
    setEditModalOpen(false);
    setPhotoPwModalOpen(false);
    setPhotoModalOpen(false);

    setPendingField(null);
    setCurrentPassword("");
    setNewValue("");

    setPhotoPassword("");
    setSelectedFile(null);
    setSelectedDefault(null);
    setUploadPreviewUrl("");
  };

  // ====== 정보 수정 ======
  const openEdit = (field) => {
    setPendingField(field);
    setCurrentPassword("");

    const preset =
      field === "name"
        ? me.memberName || ""
        : field === "nickname"
        ? me.nickname || ""
        : me.phone || "";
    setNewValue(preset);

    setPwModalOpen(true);
  };

  const afterPwConfirm = () => {
    if (!currentPassword?.trim()) return alert("비밀번호를 입력하세요.");
    setPwModalOpen(false);
    setEditModalOpen(true);
  };

  const saveInfo = async () => {
    try {
      const token = readToken();
      if (!token) {
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/login");
        return;
      }

      const trimmed = newValue?.trim();
      if (!trimmed) {
        alert("새 값을 입력하세요.");
        return;
      }

      if (pendingField === "name") {
        await memberApi.changeName(currentPassword, trimmed);
      } else if (pendingField === "nickname") {
        await memberApi.changeNickname(currentPassword, trimmed);
      } else if (pendingField === "phone") {
        await memberApi.changePhone(currentPassword, trimmed);
      } else {
        alert("수정할 항목이 선택되지 않았습니다.");
        return;
      }

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

  // ====== 프로필 사진 변경 ======
  const openPhotoModal = () => {
    setPhotoPassword("");
    setSelectedFile(null);
    setSelectedDefault(null);
    setUploadPreviewUrl("");
    setPhotoModalOpen(false);
    setPhotoPwModalOpen(true);
  };

  const afterPhotoPwConfirm = () => {
    if (!photoPassword?.trim()) return alert("비밀번호를 입력하세요.");
    setPhotoPwModalOpen(false);
    setPhotoModalOpen(true);
  };

  const triggerFilePick = () => fileInputRef.current?.click();

  const ensureAuth = () => {
    const token = readToken();
    if (!token) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const cacheBust = (url) =>
    url ? `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}` : "";

  /**
   * 백엔드 응답이 SuccessResponse 형태이고, URL이 res.data에 들어오는 구조를 지원
   * (너 로그: { status, success, message, data: "https://...jpg" })
   */
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

      // 1) 업로드 응답에서 바로 URL 받기
      const uploadRes = await memberApi.uploadProfileImage(
        photoPassword,
        selectedFile
      );

      const uploadUrl = pickUrl(uploadRes);
      if (!uploadUrl) {
        alert(
          "업로드는 됐는데 프로필 URL을 받지 못했습니다. (uploadRes.data 확인)"
        );
        return;
      }

      // localStorage에는 blob 말고 서버 URL만 저장!
      const finalUrl = cacheBust(uploadUrl);
      const updated = {
        ...me,
        profileUrl: finalUrl,
        fileUrl: finalUrl,
      };

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

      // 기본 이미지 변경 응답에서도 data에 URL이 옴(서비스가 url 반환하니까)
      const res = await memberApi.changeProfileToDefault(
        photoPassword,
        selectedDefault.fileNo
      );
      console.log("default response =", res);

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
          onClick={openPhotoModal}
          title="클릭해서 프로필 사진 변경"
        />
      </BigAvatarWrap>

      <ActionRow>
        <PrimaryButton type="button" onClick={openPhotoModal}>
          프로필 사진 변경
        </PrimaryButton>
      </ActionRow>

      <ActionRow>
        <PrimaryButton type="button" onClick={openPhotoModal}>
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

      {/* ===== 1) 비밀번호 인증 ===== */}
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

      {/* ===== 2) 값 입력 ===== */}
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

      {/* ===== 3) 프로필 사진 변경 ===== */}
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

              <PreviewBox>
                {uploadPreviewUrl ? (
                  <PreviewImg src={uploadPreviewUrl} alt="upload preview" />
                ) : (
                  <PreviewPlaceholder>업로드 미리보기</PreviewPlaceholder>
                )}
              </PreviewBox>
            </Card>

            {/* 기본 이미지 */}
            <Card>
              <CardTitle>기본 이미지로 변경</CardTitle>

              <Grid>
                {DEFAULT_IMAGES.map((img) => {
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

              <PreviewBox style={{ marginTop: 10, height: 280 }}>
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
    </Page>
  );
}

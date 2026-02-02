import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { authStorage } from '../../../utils/apiClient';
import {
  PageWrap,
  PageHeader,
  Title,
  Actions,
  PrimaryButton,
  Card,
  GridViewport,
  ImageGrid,
  ImageCard,
  Thumb,
  Meta,
  MetaRow,
  Label,
  Value,
  Divider,
  FormRow,
  TextInput,
  FileInput,
  DangerText,
  MutedText,
  DangerButton, // ✅ 추가
} from './styles';

const API_BASE_URL = window.ENV?.API_BASE_URL || 'http://localhost:8080';
const ENDPOINT = `${API_BASE_URL}/api/admin/defaultImage`;

const DefaultImageManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 삭제 중인 카드 식별용(중복 클릭 방지)
  const [deletingFileNo, setDeletingFileNo] = useState(null);

  const token = authStorage.getToken();

  const authHeaders = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const fetchList = async () => {
    setLoading(true);
    setErrMsg('');
    try {
      const res = await axios.get(ENDPOINT, { headers: authHeaders });
      setItems(res?.data?.data ?? []);
    } catch (e) {
      console.error(e);
      setErrMsg('기본 이미지 조회에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      return;
    }

    const okTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!okTypes.includes(f.type)) {
      setErrMsg('png/jpg/jpeg만 업로드 가능합니다.');
      e.target.value = '';
      setFile(null);
      return;
    }

    setErrMsg('');
    setFile(f);
  };

  const submit = async () => {
    setErrMsg('');

    if (!fileName.trim()) {
      setErrMsg('파일명을 입력해주세요.');
      return;
    }
    if (!file) {
      setErrMsg('이미지 파일을 선택해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('fileName', fileName.trim());
      fd.append('file', file);

      const res = await axios.post(ENDPOINT, fd, {
        headers: {
          ...authHeaders,
          'Content-Type': 'multipart/form-data',
        },
      });

      const next = res?.data?.data;
      if (Array.isArray(next)) setItems(next);
      else await fetchList();

      setFileName('');
      setFile(null);
      setFormOpen(false);
    } catch (e) {
      console.error(e);
      const serverMsg = e?.response?.data?.message;
      setErrMsg(serverMsg || '기본 이미지 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 삭제
  const removeItem = async (it) => {
    setErrMsg('');

    if (!it?.fileNo || !it?.fileUrl) {
      setErrMsg('삭제에 필요한 데이터가 없습니다. (fileNo/fileUrl)');
      return;
    }

    const ok = window.confirm(`"${it.fileName}" 기본 이미지를 삭제하시겠습니까?`);
    if (!ok) return;

    setDeletingFileNo(it.fileNo);
    try {
      // axios.delete는 2번째 인자로 config를 받고, body는 config.data에 넣어야 함
      const res = await axios.delete(ENDPOINT, {
        headers: authHeaders,
        data: {
          fileNo: it.fileNo,
          fileUrl: it.fileUrl,
        },
      });

      // 성공하면 목록을 다시 받는다고 가정 (백엔드가 전체 리스트를 내려주면 setItems)
      const next = res?.data?.data;
      if (Array.isArray(next)) setItems(next);
      else await fetchList();
    } catch (e) {
      console.error(e);
      setErrMsg('기본 이미지 삭제에 실패했습니다.');
    } finally {
      setDeletingFileNo(null);
    }
  };

  return (
    <PageWrap>
      <PageHeader>
        <Title>회원 기본 이미지 관리</Title>
        <Actions>
          <PrimaryButton onClick={() => setFormOpen((v) => !v)}>
            기본 프로필 이미지 등록
          </PrimaryButton>
        </Actions>
      </PageHeader>

      {errMsg && <DangerText>{errMsg}</DangerText>}
      {loading && <MutedText>불러오는 중...</MutedText>}

      {formOpen && (
        <Card>
          <FormRow>
            <Label>파일명</Label>
            <TextInput
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="예) rabbit"
              maxLength={50}
            />
          </FormRow>

          <FormRow>
            <Label>이미지 파일</Label>
            <FileInput type="file" accept=".png,.jpg,.jpeg" onChange={onPickFile} />
          </FormRow>

          <FormRow>
            <PrimaryButton disabled={submitting} onClick={submit}>
              {submitting ? '등록 중...' : '등록'}
            </PrimaryButton>
            <MutedText style={{ marginLeft: 12 }}>
              * 11개 이상이면 목록 영역이 스크롤 됩니다.
            </MutedText>
          </FormRow>
        </Card>
      )}

      <Card>
        <MutedText style={{ marginBottom: 10 }}>총 {items.length}개</MutedText>

        <GridViewport $scroll={items.length >= 11}>
          <ImageGrid>
            {items.map((it) => (
              <ImageCard key={it.fileNo}>
                <Thumb src={it.fileUrl} alt={it.fileName} />
                <Divider />

                <Meta>
                  <MetaRow>
                    <Value title={it.fileName}>{it.fileName}</Value>
                  </MetaRow>

                  <MetaRow>
                    <Label>생성</Label>
                    <Value>{it.createdAt}</Value>
                  </MetaRow>

                  <MetaRow>
                    <DangerButton
                      type="button"
                      onClick={() => removeItem(it)}
                      disabled={deletingFileNo === it.fileNo}
                      title="삭제"
                    >
                      {deletingFileNo === it.fileNo ? '삭제 중...' : '삭제'}
                    </DangerButton>
                  </MetaRow>
                </Meta>
              </ImageCard>
            ))}
          </ImageGrid>
        </GridViewport>
      </Card>
    </PageWrap>
  );
};

export default DefaultImageManagement;

// src/admin/components/RankingManagement/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { authStorage } from "../../../utils/apiClient";
import {
  PageWrap,
  PageHeader,
  Title,
  SubTitle,
  Card,
  CardHeader,
  CardTitle,
  Badge,
  Grid,
  Row,
  Label,
  Value,
  Divider,
  MutedText,
  DangerText,
  RefreshButton,
  EmptyState,
} from "./styles";

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";
const ENDPOINT = `${API_BASE_URL}/api/admin/rank`;

const formatDate = (v) => {
  if (!v) return "-";
  // 서버가 "2026-01-14" 형태면 그대로 사용
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  // ISO면 날짜만 잘라서 표시
  if (typeof v === "string" && v.includes("T")) return v.split("T")[0];
  return String(v);
};

const RankingManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const token = authStorage.getToken();

  const authHeaders = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const fetchRanks = async () => {
    setLoading(true);
    setErrMsg("");

    try {
      const res = await axios.get(ENDPOINT, { headers: authHeaders });

      // 예상 응답: { status, success, message, data: [...] }
      const data = res?.data?.data ?? [];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);

      // 서버가 ErrorResponse처럼 message를 내려주면 그걸 우선 표시
      const serverMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "";

      // 인증/인가 케이스는 메시지 좀 더 명확히
      if (e?.response?.status === 401) {
        setErrMsg("인증이 만료되었습니다. 다시 로그인해주세요. (401)");
      } else if (e?.response?.status === 403) {
        setErrMsg("관리자 권한이 없거나 접근이 거부되었습니다. (403)");
      } else {
        setErrMsg(serverMsg || "랭킹 기준 조회에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrap>
      <PageHeader>
        <div>
          <Title>랭킹 관리</Title>
          <SubTitle>랭킹 기준을 조회하고 변경할 수 있습니다.</SubTitle>
        </div>

        <RefreshButton type="button" onClick={fetchRanks} disabled={loading}>
          {loading ? "불러오는 중..." : "새로고침"}
        </RefreshButton>
      </PageHeader>

      {errMsg && <DangerText>{errMsg}</DangerText>}

      {!loading && !errMsg && items.length === 0 && (
        <EmptyState>
          <MutedText>등록된 랭킹 기준이 없습니다.</MutedText>
        </EmptyState>
      )}

      <Grid>
        {items.map((it) => (
          <Card key={it.policyCode ?? `${it.policyName}-${it.createdAt}`}>
            <CardHeader>
              <CardTitle title={it.policyName}>{it.policyName}</CardTitle>
              <Badge $active={it.status === "Y"}>
                {it.status === "Y" ? "활성" : "비활성"}
              </Badge>
            </CardHeader>

            <Divider />

            <Row>
              <Label>랭킹 순위</Label>
              <Value>{it.topN ?? "-"}</Value>
            </Row>

            <Row>
              <Label>집계 기간</Label>
              <Value>
                {it.periodDays === 0 || it.periodDays ? `${it.periodDays}일` : "-"}
              </Value>
            </Row>

            <Row>
              <Label>상세 설명</Label>
              <Value style={{ whiteSpace: "pre-wrap" }}>
                {it.description || "-"}
              </Value>
            </Row>

            <Divider />

            <Row>
              <Label>생성일</Label>
              <Value>{formatDate(it.createdAt)}</Value>
            </Row>

            <Row>
              <Label>변경일</Label>
              <Value>{formatDate(it.updatedAt)}</Value>
            </Row>

            {it.policyCode && (
              <>
                <Divider />
                <Row>
                  <Label>정책 번호</Label>
                  <Value>{it.policyId}</Value>
                </Row>
                <Row>
                  <Label>정책 코드</Label>
                  <Value>{it.policyCode}</Value>
                </Row>
                
              </>
            )}
          </Card>
        ))}
      </Grid>
    </PageWrap>
  );
};

export default RankingManagement;

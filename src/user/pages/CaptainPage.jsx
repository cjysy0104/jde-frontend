import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPageContainer,
  CaptainPageBody,
  CaptainTitle,
  CaptainSubTitle,
  CaptainErrorBox,
  CaptainEmptyBox,
} from "./styles";

import CaptainCard from "../components/CaptainCard";
import { getCaptains } from "../../utils/captain";

const CaptainsPage = () => {
  const navigate = useNavigate();

  const [captains, setCaptains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const result = await getCaptains();
        console.log("[Captains API Response]", result);

        if (!result?.success) {
          throw new Error(result?.message || "미식대장 조회 실패");
        }

        const list = Array.isArray(result.data) ? result.data : [];
        if (mounted) setCaptains(list);
      } catch (e) {
        console.error("[Captains API Error]", e);
        if (mounted) {
          setCaptains([]);
          setErrorMsg(e?.message || "요청 처리 중 오류가 발생했습니다.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, []);

  
  const handleCaptainClick = (captainNo, nickname) => {
    if (!captainNo) return;
    navigate(`/reviews/captain/${captainNo}`, { state: { nickname } });
  };

  return (
    <UserPageContainer>
      <CaptainPageBody>
        <CaptainTitle>미식대장</CaptainTitle>
        <CaptainSubTitle>미식대장들의 리뷰를 확인해보세요.</CaptainSubTitle>

        {errorMsg && <CaptainErrorBox>{errorMsg}</CaptainErrorBox>}

        {loading ? (
          <CaptainCard.SkeletonGrid count={6} />
        ) : captains.length === 0 ? (
          <CaptainEmptyBox>표시할 미식대장이 없습니다.</CaptainEmptyBox>
        ) : (
          <CaptainCard.Grid>
            {captains.map((c) => (
              <CaptainCard
                key={c.memberNo}
                memberNo={c.memberNo}
                nickname={c.nickname}
                fileUrl={c.fileUrl}
                reviewCount={c.reviewCount}
                likeCount={c.likeCount}
                
                onClick={(memberNo) => handleCaptainClick(memberNo, c.nickname)}
              />
            ))}
          </CaptainCard.Grid>
        )}
      </CaptainPageBody>
    </UserPageContainer>
  );
};

export default CaptainsPage;
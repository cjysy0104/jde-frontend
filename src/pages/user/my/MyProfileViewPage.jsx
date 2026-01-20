import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfileViewPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>My 페이지</h2>

      {/* ✅ 여기에는 "조회 UI"만 두기 */}

      {/* 원하면 여기에도 수정 버튼 두면 UX 좋아짐 */}
      
    </div>
  );
}

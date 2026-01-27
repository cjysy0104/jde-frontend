import React from "react";
import { useLocation } from "react-router-dom";
import { NavContainer, NavItem, NavLink, ActiveIndicator } from "./styles";

const Nav = () => {
  const location = useLocation();

  // ✅ 캡틴 흐름이면 상세(/reviews/:id)에서도 "미식대장"을 active로 강제
  const isCaptainFlow = location?.state?.navContext === "captains";

  return (
    <NavContainer>
      <NavItem>
        <NavLink to="/" end>
          Home
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            // 캡틴 흐름이면 리뷰조회 active를 꺼버림
            isActive && !isCaptainFlow ? "active" : ""
          }
        >
          리뷰조회
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/map">
          지도검색
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          to="/captains"
          className={({ isActive }) =>
            // 캡틴 흐름이면 항상 미식대장 active
            isActive || isCaptainFlow ? "active" : ""
          }
        >
          미식대장
          <ActiveIndicator />
        </NavLink>
      </NavItem>
    </NavContainer>
  );
};

export default Nav;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NavContainer,
  NavItem,
  NavLink,
  ActiveIndicator,
} from "./styles";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavItem>
        <NavLink to="/" end>
          Home
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/reviews">
          리뷰조회
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/">
          지도검색
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/">
          미식대장
          <ActiveIndicator />
        </NavLink>
      </NavItem>
    </NavContainer>
  );
};

export default Nav;
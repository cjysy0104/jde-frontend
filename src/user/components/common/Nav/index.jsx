import React from "react";
import {
  NavContainer,
  NavItem,
  NavLink,
  ActiveIndicator,
} from "./styles";

const Nav = () => {
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

        <NavLink to="/map">
          지도검색
          <ActiveIndicator />
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink to="/captains">
          미식대장
          <ActiveIndicator />
        </NavLink>
      </NavItem>
    </NavContainer>
  );
};

export default Nav;
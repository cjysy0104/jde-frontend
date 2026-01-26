import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import { NavLink as RouterNavLink } from "react-router-dom";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export const NavItem = styled.div`
  position: relative;
`;

<<<<<<< HEAD
/* react-router NavLink 기반 */
=======
>>>>>>> 72c4a09a12b3cf88edb9778a5249a7048460214b
export const NavLink = styled(RouterNavLink)`
  font-size: 22px;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding-bottom: 6px;
  transition: color 0.2s;

  &:hover {
    color: #f97316;
  }

  &:hover div {
    transform: scaleX(1);
  }

<<<<<<< HEAD
  /* ✅ 현재 페이지(active)일 때 */
  &.active {
    color: #f97316;
  }

  &.active div {
    transform: scaleX(1);
  }
=======
>>>>>>> 72c4a09a12b3cf88edb9778a5249a7048460214b
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #f97316;
  transform: scaleX(0);
  transition: transform 0.2s ease;
  transform-origin: center;
`;

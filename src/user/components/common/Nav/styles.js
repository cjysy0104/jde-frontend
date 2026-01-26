import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  gap: 32px;
`;

export const NavItem = styled.div`
  position: relative;
`;

export const NavLink = styled.a`
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
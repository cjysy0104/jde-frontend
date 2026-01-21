import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  justify-content: center;
  padding: 32px 24px;
  gap: 16px;
`;

export const Side = styled.aside`
  width: 240px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;
  height: fit-content;
  position: sticky;
  top: 18px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 14px;
  color: #111827;
  cursor: pointer;
`;

export const TabLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 12px 12px;
  border-radius: 12px;
  font-weight: 800;
  color: #111827;
  background: #f9fafb;
  border: 1px solid transparent;
  margin-bottom: 10px;

  &.active {
    background: rgba(249, 115, 22, 0.12);
    border-color: rgba(249, 115, 22, 0.35);
    color: #ea580c;
  }

  &:hover {
    background: #f3f4f6;
  }
`;

export const Content = styled.main`
  width: min(920px, 100%);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 22px;
`;

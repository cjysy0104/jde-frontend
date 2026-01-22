import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Layout, Side, Title, TabLink, Content } from "./styles";

export default function MyLayout() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Side>
        <Title onClick={() => navigate("/my")}>My 페이지</Title>

        <NavLink
          to="/my/list"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{ textDecoration: "none" }}
        >
          <TabLink as="div" className={({ isActive }) => (isActive ? "active" : "")}>
            내 리뷰/댓글
          </TabLink>
        </NavLink>

        <NavLink
          to="/my/bookmarks"
          className={({ isActive }) => (isActive ? "active" : "")}
          style={{ textDecoration: "none" }}
        >
          <TabLink as="div" className={({ isActive }) => (isActive ? "active" : "")}>
            내 즐겨찾기
          </TabLink>
        </NavLink>
      </Side>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

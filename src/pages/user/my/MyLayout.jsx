import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Layout, Side, Title, TabLink, Content } from "./styles";

export default function MyLayout() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Side>
        <Title onClick={() => navigate("/user/my")} style={{ cursor: "pointer" }}>
          My 페이지
        </Title>

        <TabLink as={NavLink} to="/user/my/profile" end>
          정보수정
        </TabLink>

        <TabLink as={NavLink} to="/user/my/list">
          내 리뷰/댓글
        </TabLink>

        <TabLink as={NavLink} to="/user/my/bookmarks">
          내 즐겨찾기
        </TabLink>
      </Side>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

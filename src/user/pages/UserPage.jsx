import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Nav from "../components/common/Nav";
import { UserPageContainer } from "./styles";

export default function UserPage() {
  return (
    <UserPageContainer>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </UserPageContainer>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header/index";
import Footer from "../components/common/Footer/index";
import { UserPageContainer } from "./styles";

export default function UserPage() {
  return (
    <UserPageContainer>
      <Header />
      <Outlet />
      <Footer />
    </UserPageContainer>
  );
}

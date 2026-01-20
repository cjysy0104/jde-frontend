import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserPageContainer } from "./styles";

const UserPage = () => {
  return (
    <UserPageContainer>
      <Header />
      <Outlet />
      <Footer />
    </UserPageContainer>
  );
};

export default UserPage;

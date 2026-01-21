import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../user/components/common/Header";
import Footer from "../user/components/common/Footer";

export default function UserPage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

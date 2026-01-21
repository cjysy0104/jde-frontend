import React from 'react';
import Header from '../components/common/Header';
import Login from '../components/Login';
import Footer from '../components/common/Footer';
import { UserPageContainer } from './styles';
import Nav from '../components/common/Nav';

const LoginPage = () => {
  return (
    <UserPageContainer>
      <Header />
      <Nav />
      <Login />
      <Footer />
    </UserPageContainer>
  );
};

export default LoginPage;
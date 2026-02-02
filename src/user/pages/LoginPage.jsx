import React from 'react';
import Header from '../components/common/Header';
import Login from '../components/Login';
import Footer from '../components/common/Footer';
import { UserPageContainer } from './styles';

const LoginPage = () => {
  return (
    <UserPageContainer>
      <Header />
      <Login />
      <Footer />
    </UserPageContainer>
  );
};

export default LoginPage;
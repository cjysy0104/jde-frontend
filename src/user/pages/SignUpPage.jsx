import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { UserPageContainer } from './styles';
import Signup from '../components/SignUp';

const SignUpPage = () => {
  return (
    <UserPageContainer>
      <Header />
      <Signup />
      <Footer />
    </UserPageContainer>
  );
};

export default SignUpPage;
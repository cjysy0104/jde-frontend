import React from 'react';
import Header from '../components/common/Header';
import NotFound from '../components/common/NotFound';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { NotFoundPageContainer } from './styles';

    
const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <Header />
      <Nav />
      <NotFound />
      <Footer />
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
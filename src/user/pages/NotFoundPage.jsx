import React from 'react';
import Header from '../components/common/Header';
import NotFound from '../components/common/NotFound';
import Footer from '../components/common/Footer';
import { NotFoundPageContainer } from './styles';

    
const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <Header />
      <NotFound />
      <Footer />
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
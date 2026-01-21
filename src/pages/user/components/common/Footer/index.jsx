import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import {
  FooterContainer,
  FooterContent,
  Copyright,
  FooterLinks,
  FooterLink,
  SocialIcons,
  SocialIcon,
} from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© 2024 Just Do Eat. All rights reserved.</Copyright>
        <FooterLinks>
          <FooterLink href="#">서비스 약관</FooterLink>
          <FooterLink href="#">개인정보처리방침</FooterLink>
          <FooterLink href="#">이용약관</FooterLink>
          <FooterLink href="#">고객센터</FooterLink>
          <FooterLink href="#">공지사항</FooterLink>
        </FooterLinks>
        <SocialIcons>
          <SocialIcon href="#" aria-label="Instagram">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Facebook">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            <FaTwitter />
          </SocialIcon>
        </SocialIcons>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

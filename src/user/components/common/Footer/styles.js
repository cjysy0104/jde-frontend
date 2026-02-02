import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  padding: 40px 24px;
  margin-top: auto;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Copyright = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FooterLink = styled.a`
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #111827;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #111827;
  }
  
  svg {
    font-size: 20px;
  }
`;

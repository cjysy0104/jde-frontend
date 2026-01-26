import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  border-bottom: 1px solid #e5e7eb;
`;

export const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

export const LogoText = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const MenuList = styled.nav`
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.$active ? '#f3f4f6' : 'transparent'};
  color: ${props => props.$active ? '#111827' : '#6b7280'};
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const MenuIcon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

export const MenuChevron = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

export const HelpBadge = styled.span`
  background-color: #3b82f6;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
`;

export const BottomMenu = styled.div`
  padding: 16px 0;
  border-top: 1px solid #e5e7eb;
`;

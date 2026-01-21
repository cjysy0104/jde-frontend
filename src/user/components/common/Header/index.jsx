import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

import logo from "../../../../assets/logo.png";

import {
  HeaderContainer,
  HeaderContent,
  LogoSection,
  LogoImage,
  LogoText,
  NavList,
  NavItem,
  NavLink,
  ActiveIndicator,
  AuthButtons,
  AuthButton,
} from "./styles";

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={() => navigate("/user")}>
          <LogoImage src={logo} alt="JUST DO EAT" />
          <LogoText>
            <FaUtensils style={{ marginRight: 8 }} />
            JUST DO EAT
          </LogoText>
        </LogoSection>

        <NavList>
          <NavItem>
            <NavLink className="active">
              Home
              <ActiveIndicator />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>리뷰조회</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>지도검색</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>미식대장</NavLink>
          </NavItem>
        </NavList>

        <AuthButtons>
          <AuthButton onClick={() => navigate("/login")}>로그인</AuthButton>
          <AuthButton onClick={() => navigate("/signup")}>회원가입</AuthButton>
        </AuthButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

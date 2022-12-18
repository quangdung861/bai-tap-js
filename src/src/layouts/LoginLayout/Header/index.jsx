import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";
import * as S from "./styles";

const Header = ({breadcrumb}) => {
  const navigate = useNavigate();
  return (
    <>
      <S.HeaderContainer>
        <S.HeaderContent>
          <div className="left">
            <div className="logo-header">
              <span onClick={() => navigate(ROUTES.USER.HOME)} style={{fontWeight: 500, marginRight: 20}}>DE VINC</span>
              <span>{breadcrumb}</span>
            </div>
          </div>
          <div className="right">
            <span style={{ color: "#ee4d2d", cursor: "pointer" }}>
              Bạn cần giúp đỡ?
            </span>
          </div>
        </S.HeaderContent>
      </S.HeaderContainer>
    </>
  );
};

export default Header;

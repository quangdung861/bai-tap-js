import React from "react";

import Header from "../../../layouts/admin/Header";

import * as S from "./styles"
const DashboardPageAdmin = () => {
  return (
    <S.MainContainer>
      <Header breadcrumb="Tổng quan" />
      <S.MainContent>
        <div style={{width: "100%"}}>

        <img style={{width: "100%"}} src="https://www.klipfolio.com/gatsby-files/static/1d0d4b2e191a15d080c3857830cdedea/9e562/dashboard-examples-hero.png" alt="" />
        </div>
      </S.MainContent>
    </S.MainContainer>
  );
};

export default DashboardPageAdmin;

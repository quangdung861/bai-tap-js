import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import {ROUTES} from "../../constants/routes"

import Header from "../LoginLayout/Header"
import Footer from "../user/Footer"
import NewsLetter from "../user/Newsletter"
import * as S from "../LoginLayout/styles"

const RegisterLayout = () => {

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return <Navigate to={ROUTES.USER.HOME} />;
  }

  return (
    <>
      <Header breadcrumb={"Đăng ký"} />
      <S.MainContainer>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default RegisterLayout;
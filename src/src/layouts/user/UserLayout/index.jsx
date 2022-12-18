import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

import * as S from "./styles"
import Newsletter from '../Newsletter';

const UserLayout = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.MainContainer>
      <Newsletter />
      <Footer />
    </>
  )
}

export default UserLayout;
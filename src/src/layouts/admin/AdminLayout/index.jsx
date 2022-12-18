import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import Sidebar from "../Sidebar";
import * as S from "./styles";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../constants/routes";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { categoryList } = useSelector((state) => state.categoryAdminReducer);
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && userInfo.loading && categoryList.loading) {
    return (
      <S.LoadingWrapper>
        <LoadingOutlined style={{ fontSize: 50, color: "#1b92ff" }} />
      </S.LoadingWrapper>
    );
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }

  return (
    <S.MainContainer>
      <Sidebar isShowSidebar={isShowSidebar} setIsShowSidebar={setIsShowSidebar} />
      <S.MainContent isShowSidebar={isShowSidebar}>
        <Outlet />
      </S.MainContent>
    </S.MainContainer>
  );
};

export default AdminLayout;

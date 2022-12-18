import React, { useState } from "react";
import {
  QuestionCircleFilled,
  HeartFilled,
  DownOutlined,
  BellFilled,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Menu, Avatar, Badge } from "antd";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

import { logoutAction } from "../../../redux/user/actions";

const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const Header = ({ breadcrumb }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const randomIndex = Math.floor(colorList.length * Math.random());

  const [color, setColor] = useState(colorList[randomIndex]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logoutAction());
  };

  return (
    <S.mainContainer>
      <S.mainContent>
        <span className="breadcrumb">{breadcrumb}</span>
        <div className="list-action">
          <div>
            <Space>
              <QuestionCircleFilled /> Trợ giúp
            </Space>
          </div>
          <div>
            <Space>
              <HeartFilled /> Góp ý
            </Space>
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <Space>
                      <UserOutlined />
                      <div onClick={() => navigate(ROUTES.USER.ACCOUNT)}>
                        Thông tin tài khoản
                      </div>
                    </Space>
                  ),
                  key: "item-1",
                },
                {
                  label: (
                    <div onClick={() => logout()}>
                      <Space>
                        <LogoutOutlined />
                        <span>Đăng xuất</span>
                      </Space>
                    </div>
                  ),
                  key: "item-2",
                },
              ],
            }}
          >
            <div className="account">
              <Space>
                <Avatar
                  style={{
                    backgroundColor: color,
                  }}
                  size=""
                >
                  {userInfo.data.fullName.charAt(0)}
                </Avatar>
                <span>{userInfo.data.fullName}</span>
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
          <div>
            <Badge size="medium" count={5}>
              <BellFilled style={{ fontSize: "24px", color: "#1b92ff" }} />
            </Badge>
          </div>
        </div>
      </S.mainContent>
    </S.mainContainer>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input, Dropdown, Space, Menu, Avatar, Badge } from "antd";
import {
  ShoppingCartOutlined,
  DownOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { ROUTES } from "../../../constants/routes";
import * as S from "./styles";
import { logoutAction } from "../../../redux/user/actions/user.action";

const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const randomIndex = Math.floor(colorList.length * Math.random());
  const [color, setColor] = useState(colorList[randomIndex]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logoutAction());
  };

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderContent className="header-content">
          <div className="logo-header">
            <span onClick={() => navigate(ROUTES.USER.HOME)}>DE VINC</span>
          </div>
          <ul className="list-action">
            {/* <li>
              <div className="search">
                <Input.Search
                  placeholder="Tìm kiếm"
                  onSearch={{}}
                  style={{
                    width: 200,
                  }}
                />
              </div>
            </li> */}

            <li>
              <div
                className="products"
                onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}
              >
                <span>SẢN PHẨM</span>
              </div>
            </li>
            {!userInfo.data.id ? (
              <>
                <li onClick={() => navigate(ROUTES.USER.REGISTER)}>ĐĂNG KÝ</li>

                <li onClick={() => navigate(ROUTES.LOGIN)}>ĐĂNG NHẬP</li>
              </>
            ) : (
              <li>
                {userInfo.data.role !== "admin" ? (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: (
                            <div onClick={() => navigate(ROUTES.USER.PROFILE)}>
                              Thông tin tài khoản
                            </div>
                          ),
                          key: "item-1",
                        },
                        {
                          label: (
                            <div onClick={() => handleLogout()}>Đăng xuất</div>
                          ),
                          key: "item-2",
                        },
                      ],
                    }}
                  >
                    <Space>
                      <Avatar
                        style={{
                          backgroundColor: color,
                        }}
                      >
                        {userInfo.data.fullName.charAt(0)}
                      </Avatar>
                      {userInfo.data.fullName} <DownOutlined />
                    </Space>
                  </Dropdown>
                ) : (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: userInfo.data.role === "admin" && (
                            <div
                              onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
                            >
                              Trang quản trị
                            </div>
                          ),
                          key: "item-1",
                        },
                        {
                          label: (
                            <div onClick={() => navigate(ROUTES.USER.PROFILE)}>
                              Thông tin tài khoản
                            </div>
                          ),
                          key: "item-2",
                        },
                        {
                          label: (
                            <div onClick={() => handleLogout()}>Đăng xuất</div>
                          ),
                          key: "item-3",
                        },
                      ],
                    }}
                  >
                    <Space>
                      <Avatar
                        style={{
                          backgroundColor: color,
                        }}
                      >
                        {userInfo.data.fullName.charAt(0)}
                      </Avatar>
                      {userInfo.data.fullName} <DownOutlined />
                    </Space>
                  </Dropdown>
                )}
              </li>
            )}

            <li onClick={() => navigate(ROUTES.USER.CART)}>
              <Badge count={cartList.length}>
                <ShoppingCartOutlined style={{ fontSize: 20 }} />
              </Badge>
            </li>
          </ul>
        </S.HeaderContent>
        <S.HeaderContentMobile className="header-content-mobile">
          <div className="content-mobile">
            <div>
              <div
                className="products"
                onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}
                style={{
                  marginTop: 8,
                  cursor: "pointer",
                  fornSize: 12,
                  fontWeight: 500,
                }}
              >
                <span>SẢN PHẨM</span>
              </div>
            </div>

            <div>
              <Link
                to={ROUTES.USER.HOME}
                style={{
                  color: "black",
                  fontWeight: 500,
                  fontSize: 24,
                  cursor: "pointer",
                }}
              >
                <span>DE VINC</span>
              </Link>
            </div>

            <Space style={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={() => navigate(ROUTES.USER.CART)}
                style={{ marginTop: 11, marginRight: 12 }}
              >
                <Badge count={cartList.length}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 20, cursor: "pointer" }}
                  />
                </Badge>
              </div>

              {userInfo.data.id ? (
                userInfo.data.role !== "admin" ? (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: (
                            <Link to={ROUTES.USER.PROFILE}>
                              <div> Thông tin tài khoản</div>
                            </Link>
                          ),
                          key: "item-1",
                        },
                        {
                          label: (
                            <div onClick={() => handleLogout()}>Đăng xuất</div>
                          ),
                          key: "item-2",
                        },
                      ],
                    }}
                  >
                    <Space>
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: color,
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: 12 }}>
                          {userInfo.data.fullName.charAt(0)}
                        </span>
                      </Avatar>
                    </Space>
                  </Dropdown>
                ) : (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: userInfo.data.role === "admin" && (
                            <Link to={ROUTES.ADMIN.DASHBOARD}>
                              <div>Trang quản trị</div>
                            </Link>
                          ),
                          key: "item-1",
                        },
                        {
                          label: (
                            <Link to={ROUTES.USER.PROFILE}>
                              <div> Thông tin tài khoản</div>
                            </Link>
                          ),
                          key: "item-2",
                        },
                        {
                          label: (
                            <div onClick={() => handleLogout()}>Đăng xuất</div>
                          ),
                          key: "item-3",
                        },
                      ],
                    }}
                  >
                    <Space>
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: color,
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: 12 }}>
                          {userInfo.data.fullName.charAt(0)}
                        </span>
                      </Avatar>
                    </Space>
                  </Dropdown>
                )
              ) : (
                <div>
                  <UserOutlined
                    style={{ fontSize: 20, marginTop: 8 }}
                    onClick={() => navigate(ROUTES.LOGIN)}
                  />
                </div>
              )}
            </Space>
          </div>
        </S.HeaderContentMobile>
      </S.HeaderContainer>
    </>
  );
};

export default Header;

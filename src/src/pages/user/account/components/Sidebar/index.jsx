import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col } from "antd";
import { ROUTES } from "../../../../../constants/routes";

import * as S from "./styles";

const Sidebar = ({ orderId }) => {
  const { pathname } = useLocation();

  return (
    <S.Wrapper>
      <Row gutter={16}>
        <Col md={24} sm={8} xs={8}>
          <S.CustomLink
            className="custom-link"
            to={ROUTES.USER.PROFILE}
            active={pathname === ROUTES.USER.PROFILE ? "true" : "false"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img
                src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                alt=""
                style={{ width: "15%", marginRight: "11px" }}
              />
              <span>Hồ sơ</span>
            </div>
          </S.CustomLink>
        </Col>
        <Col md={24} sm={8} xs={8}>
          <S.CustomLink
            className="custom-link"
            to={ROUTES.USER.ADDRESS}
            active={pathname === ROUTES.USER.ADDRESS ? "true" : "false"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img
                src="https://w7.pngwing.com/pngs/457/630/png-transparent-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-heart.png"
                alt=""
                style={{ width: "13%", marginRight: "15px" }}
              />
              <span>Địa chỉ</span>
            </div>
          </S.CustomLink>
        </Col>
        <Col md={24} sm={8} xs={8}>
          <S.CustomLink
            className="custom-link"
            to={ROUTES.USER.PURCHASE}
            active={
              pathname === ROUTES.USER.PURCHASE ||
              pathname === `/user/account/purchase/order/${orderId}`
                ? "true"
                : "false"
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img
                src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                alt=""
                style={{ width: "16%", marginRight: "8px" }}
              />
              <span>Đơn mua</span>
            </div>
          </S.CustomLink>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default Sidebar;

import React, { useEffect, useMemo } from "react";

import { Tabs, Row, Col, Form, Input, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

import AllOders from "./components/AllOrders";
import WaitingForConfirmOrders from "./components/WaitingForConfirmOrders";
import WaitingForDelivery from "./components/WaitingForDelivery";
import Delivering from "./components/Delivering";
import Deliverd from "./components/Delivered"
import RefundProduct from "./components/RefundProduct";
import CancelOrders from "./components/CancelOrders";

import * as S from "./styles";

const PurchasePage = () => {
  // const { userInfo } = useSelector((state) => state.userReducer);

  const items = [
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Tất cả
        </div>
      ),
      key: "item-1",
      children: <AllOders />,
    },
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Chờ xác nhận
        </div>
      ),
      key: "item-2",
      children: <WaitingForConfirmOrders />,
    },
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Chờ lấy hàng
        </div>
      ),
      key: "item-3",
      children: <WaitingForDelivery />,
    },
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Đang giao
        </div>
      ),
      key: "item-4",
      children: <Delivering />,
    },
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Đã giao
        </div>
      ),
      key: "item-5",
      children: <Deliverd />,
    },
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Đã hủy
        </div>
      ),
      key: "item-6",
      children: <CancelOrders />,
    },
    {
      label: (
        <div
          style={{
            width: 100,
            textAlign: "center",
          }}
        >
          Trả hàng/Hoàn tiền
        </div>
      ),
      key: "item-7",
      children: <RefundProduct />,
    },
  ];

  return (
    <S.Wrapper>
      <Row gutter={[16, 16]}>
        <Col md={4} sm={24} xs={24}>
          <Sidebar className="sidebar" />
        </Col>
        <Col md={20} sm={24} xs={24}>
          <div
            style={{
              minHeight: "80vh",
              height: "100%",
              background: "#efefef",
            }}
          >
            <S.CustomTabs  size="large"  defaultActiveKey="item-1" items={items} />
          </div>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default PurchasePage;

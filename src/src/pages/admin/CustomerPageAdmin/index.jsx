import React, { useEffect } from "react";
import Header from "../../../layouts/admin/Header";
import { Button, Space, Tabs, Tag, Table, Pagination, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerListAction,
  deleteCustomerAction,
} from "../../../redux/admin/actions";
import { ADMIN_TABLE_LIMIT } from "../../../constants/pagination";

import * as S from "./styles";
const CustomerPageAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customerList } = useSelector((state) => state.customerAdminReducer);

  useEffect(() => {
    dispatch(
      getCustomerListAction({
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  }, []);

  const handleChangePage = (page) => {
    dispatch(
      getCustomerListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  };

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomerAction(id));
  };

  const productListData = customerList.data?.map((item, index) => {
    return {
      key: item.id,
      ...item,
    };
  });

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => {
        return (
          <Space>
            <Avatar shape="square" />
            <Link>{record.fullName}</Link>
          </Space>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) => {
        return phoneNumber && <Tag color="warning">{phoneNumber}</Tag>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button ghost type="primary">
            Chỉnh sửa
          </Button>
          <Button
            ghost
            type="danger"
            onClick={() => handleDeleteCustomer(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const items = [
    {
      label: <span style={{ padding: "6px 16px" }}>Khách hàng</span>,
      key: "item-1",
      children: (
        <>
          <S.Wrapper>
            <Table
              columns={columns}
              dataSource={productListData}
              pagination={false}
              style={{ flex: 1 }}
            />

            <Pagination
              current={customerList.meta.page}
              pageSize={ADMIN_TABLE_LIMIT}
              total={customerList.meta.total}
              onChange={(page) => handleChangePage(page)}
              style={{ margin: "16px auto" }}
            />
          </S.Wrapper>
        </>
      ),
    },
  ];

  return (
    <S.MainContainer>
      <Header breadcrumb="Danh sách khách hàng" />
      <S.MainContent>
        <Tabs
          style={{ backgroundColor: "white", marginTop: 24 }}
          items={items}
        />
      </S.MainContent>
    </S.MainContainer>
  );
};

export default CustomerPageAdmin;

import React, { useEffect, useState } from "react";
import Header from "../../../../layouts/admin/Header";
import {
  Button,
  Space,
  Tabs,
  Tag,
  Table,
  Pagination,
  Avatar,
  Spin,
  Modal,
  Input,
  Form,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductListAction,
  deleteProductAction,
  getCategoryListAction,
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "../../../../redux/admin/actions";
import { ADMIN_TABLE_LIMIT } from "../../../../constants/pagination";

import * as S from "./styles";
const ProductsListPageAdmin = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
  const [categoryForm] = Form.useForm();
  const [editCategoryForm] = Form.useForm();

  const [isEditCategoryForm, setIsEditCategoryForm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, deleteProductData } = useSelector(
    (state) => state.productAdminReducer
  );
  const { categoryList } = useSelector((state) => state.categoryAdminReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateCategory = (values) => {
    dispatch(createCategoryAction(values));
  };
  const handleDeleteCategory = (values) => {
    dispatch(deleteCategoryAction(values));
  };
  const handleUpdateCategory = (values) => {
    dispatch(updateCategoryAction({
      ...values,
      callback: {
        isEditForm: setIsEditCategoryForm(""),
        resetForm: editCategoryForm.resetFields(),
      }

    }))
  };

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  const handleChangePage = (page) => {
    dispatch(
      getProductListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductAction(id));
  };

  const productListData = productList.data?.map((item, index) => {
    return {
      key: item.id,
      ...item,
    };
  });

  const dataSourceCategory = categoryList.data?.map((item, index) => {
    return {
      key: item.id,
      ...item,
    };
  });
  console.log(
    "🚀 ~ file: index.jsx ~ line 102 ~ dataSourceCategory ~ dataSourceCategory",
    dataSourceCategory
  );

  // eslint-disable-next-line no-sparse-arrays
  const columnsCategory = [
    {
      title: "Loại sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) =>
        isEditCategoryForm === record.id ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <div style={{ width: "50%", marginRight: 8 }}>
              <Form
                name="editCategoryForm"
                form={editCategoryForm}
                onFinish={(values) =>
                  handleUpdateCategory({
                    ...values,
                    categoryId: record.id,
                  })
                }
              >
                <Form.Item name="categoryName" style={{ width: "100%" }}>
                  <Input />
                </Form.Item>
              </Form>
            </div>
            <div>
              <Button
                type="primary"
                ghost
                onClick={() => editCategoryForm.submit()}
                style={{ marginRight: 8 }}
              >
                Lưu
              </Button>
              <Button
                type="danger"
                ghost
                onClick={() => setIsEditCategoryForm("")}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          record.name
        ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) =>
        !isEditCategoryForm && (
          <Space size="middle">
            <Button
              ghost
              type="primary"
              onClick={() => setIsEditCategoryForm(record.id)}
            >
              Chỉnh sửa
            </Button>
            <Button
              ghost
              type="danger"
              onClick={() => handleDeleteCategory(record.id)}
            >
              Xóa
            </Button>
          </Space>
        ),
    },
    ,
  ];

  ///

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space style={{ width: "400px" }}>
            <Avatar shape="square" />
            <Link
              to={generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: record.id })}
            >
              {record.name}
            </Link>
          </Space>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <Tag
            color={record.status === "Đang giao dịch" ? "success" : "warning"}
          >
            {record.status}
          </Tag>
        );
      },
    },
    {
      title: "Loại",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            ghost
            type="primary"
            onClick={() =>
              navigate(
                generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, {
                  id: record.id,
                })
              )
            }
          >
            Chỉnh sửa
          </Button>
          <Button
            ghost
            type="danger"
            onClick={() => handleDeleteProduct(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const items = [
    {
      label: <span style={{ padding: "6px 16px" }}>Tất cả sản phẩm</span>,
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
              current={productList.meta.page}
              pageSize={ADMIN_TABLE_LIMIT}
              total={productList.meta.total}
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
      <Spin indicator={antIcon} spinning={deleteProductData.loading}>
        <Header breadcrumb="Danh sách sản phẩm" />
        <S.MainContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "16px 0px",
            }}
          >
            <Button
              type="danger"
              ghost
              onClick={showModal}
              style={{ marginRight: 12 }}
            >
              <Space>
                <PlusOutlined />
                Loại sản phẩm
              </Space>
            </Button>
            <Button
              type="primary"
              onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}
            >
              <Space>
                <PlusOutlined />
                Thêm sản phẩm
              </Space>
            </Button>
          </div>

          <Tabs style={{ backgroundColor: "white" }} items={items} />
        </S.MainContent>
      </Spin>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <h3>Loại sản phẩm</h3>
        <div style={{ marginTop: 8 }}>
          <Form
            name="categoryForm"
            form={categoryForm}
            onFinish={(values) => handleCreateCategory(values)}
            style={{ display: "flex" }}
          >
            <Form.Item
              name="category"
              style={{ width: "100%", marginRight: 8 }}
            >
              <Input placeholder="Loại sản phẩm" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              <PlusOutlined />
              Thêm
            </Button>
          </Form>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Table
            dataSource={dataSourceCategory}
            columns={columnsCategory}
            pagination={false}
          />
        </div>
      </Modal>
    </S.MainContainer>
  );
};

export default ProductsListPageAdmin;

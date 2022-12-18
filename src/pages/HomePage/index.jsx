import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Space,
  Button,
  Input,
  Table,
  Card,
  Form,
  Modal,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import {
  getCustomerListAction,
  createCustomerAction,
  deleteCustomerAction,
  updateNameAction,
} from "../../redux/actions";

// import { convertBase64ToImage } from "../../utils";

import { convertImageToBase64 } from "../../utils/file";

import * as S from "./styles";

const HomePage = () => {
  const dispatch = useDispatch();
  const [createUserForm] = Form.useForm();
  const [updateNameForm] = Form.useForm();

  const [filterParams, setFilterParams] = useState({
    keyword: "",
  });

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

  const handleFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      [key]: value,
    });
    dispatch(
      getCustomerListAction({
        params: {
          ...filterParams,
          [key]: value,
        },
      })
    );
  };

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomerAction(id));
  };

  const handleUpdateName = ({ id, values }) => {
    dispatch(updateNameAction({ id, values }));
  };

  const { customerList } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(
      getCustomerListAction({
        params: {
          ...filterParams,
        },
      })
    );
  }, []);

  const dataSource = customerList.data.map((item) => {
    return {
      key: item.id,
      ...item,
    };
  });

  const handleCreateProduct = async (values) => {
    const { images  } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }

    await dispatch(
      createCustomerAction({
        images: newImages,
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
        callback: {
          resetFields: () => createUserForm.resetFields(),
        },
      })
    );
  };

  // const handleCreateUser = (values) => {
  //   dispatch(
  //     createCustomerAction({
  //       name: values.name,
  //       phoneNumber: values.phoneNumber,
  //       email: values.email,
  //       callback: {
  //         resetFields: () => createUserForm.resetFields(),
  //       },
  //     })
  //   );
  // };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={
            images[0]?.url ||
            "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          }
          alt=""
          style={{ width: 80, height: 80, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name, record) => {
        return (
          <Space
            key={record.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>{name}</div>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 12 }}
            >
              Sửa
            </Button>
            <Modal
              title="Cập nhật Tên"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Trở lại
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => updateNameForm.submit()}
                >
                  Cập nhật
                </Button>,
              ]}
            >
              <Form
                name="updateNameForm"
                form={updateNameForm}
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                onFinish={(values) => {
                  handleUpdateName({ id: record.id, values });
                }}
              >
                <Form.Item
                  label="Tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa nhập tên!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumbers",
      key: "phoneNumbers",
      render: (phoneNumbers, record) => {
        const phoneNumberList = phoneNumbers.map((item) => {
          return (
            <Space
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div>{item.phoneNumber}</div>
            </Space>
          );
        });
        return <div>{phoneNumberList}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "emails",
      key: "emails",
      render: (emails) => {
        const emailList = emails.map((item) => {
          return <div key={item.id}>{item.email}</div>;
        });
        return <div>{emailList}</div>;
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteCustomer(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <S.Wrapper>
      <Row>
        <Col
          md={24}
          style={{
            color: "white",
            backgroundColor: "#88AAB5",
            height: 80,
            padding: 16,
          }}
        >
          <h2>Ứng dụng quản lý danh bạ điện thoại</h2>
        </Col>
        <Col md={24} style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 5 }}>Tìm kiếm theo tên</div>
          <Input
            onChange={(e) => handleFilter("keyword", e.target.value)}
            placeholder="Tìm kiếm theo tên"
            value={filterParams.keyword}
          />
        </Col>
        <Col
          md={24}
          style={{
            marginTop: 16,
            fontWeight: 500,
            color: "#88AAB5",
            fontSize: 20,
          }}
        >
          Danh sách
        </Col>
        <Col md={24} style={{ marginTop: 12 }}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Col>
        <Col md={24} style={{ marginTop: 12 }}>
          <Card title="Thêm mới người dùng">
            <Form
              name="createUserForm"
              form={createUserForm}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 10,
              }}
              onFinish={(values) => handleCreateProduct(values)}
            >
              <Form.Item
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập số điện email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Card title="Ảnh sản phẩm" className="card-item">
                <Form.Item
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Bạn chưa tải lên ảnh sản phẩm",
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={Upload.LIST_IGNORE}
                  >
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Card>

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 10,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Tạo mới
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default HomePage;

import React, { useEffect } from "react";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Avatar,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

import { updateUserInfoAction } from "../../../../redux/user/actions";

import * as S from "./styles";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [profileForm] = Form.useForm();
  const { userInfo } = useSelector((state) => state.userReducer);
  console.log("🚀 ~ file: index.jsx ~ line 11 ~ Page ~ userInfo", userInfo);

  const initialValues = {
    email: userInfo.data.email || undefined,
    fullName: userInfo.data.fullName || undefined,
    phoneNumber: userInfo.data.phoneNumber || undefined,
  };

  const handleSubmitProfileForm = (values) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 23 ~ handleSubmitProfileForm ~ values",
      values
    );
    dispatch(updateUserInfoAction({ userId: userInfo.data.id, ...values }));
  };

  useEffect(() => {
    profileForm.resetFields();
  }, [userInfo]);

  return (
    <S.Wrapper>
      <Row gutter={[16, 16]}>
        <Col md={4} sm={24} xs={24} className="sidebar">
          <Sidebar />
        </Col>
        <Col md={20} sm={24} xs={24}>
          <div
            style={{
              backgroundColor: "white",
              minHeight: "80vh",
              height: "100%",
              padding: "24px 30px",
            }}
          >
            <Row>
              <Col span={24}>
                <h2>Hồ sơ của tôi</h2>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div
                  style={{ borderBottom: "1px solid #ccc", paddingTop: 18 }}
                ></div>
              </Col>
            </Row>
            <Skeleton
              style={{ marginTop: 40 }}
              active
              loading={userInfo.loading}
            >
              <Row
                style={{
                  paddingTop: 24,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Col md={14} sm={24} xs={24} style={{ paddingRight: 50 }}>
                  <Form
                    form={profileForm}
                    name="profileForm"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={initialValues}
                    onFinish={(values) => handleSubmitProfileForm(values)}
                  >
                    <Form.Item
                      name="email"
                      label="Tên đăng nhập/Email"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập Tên đăng nhập/Email",
                        },
                      ]}
                    >
                      <Input style={{ height: 40 }} />
                    </Form.Item>
                    <Form.Item
                      name="fullName"
                      label="Tên"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập Tên",
                        },
                      ]}
                    >
                      <Input style={{ height: 40 }} />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập Số điện thoại",
                        },
                      ]}
                    >
                      <Input style={{ height: 40 }} />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        className="btn-submit"
                        type="primary"
                        danger
                        htmlType="submit"
                      >
                        Lưu
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>

                <Col md={10} sm={24} xs={24} className="content-right">
                  <Row>
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 24,
                      }}
                    >
                      <Avatar
                        size={200}
                        src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                      />
                    </Col>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button style={{ width: 110, height: 40 }}>
                        Chọn Ảnh
                      </Button>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 16,
                        color: "#9c9c9c",
                      }}
                    >
                      <div>
                        <div>Dụng lượng file tối đa 1 MB</div>
                        <div>Định dạng:.JPEG, .PNG</div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Skeleton>
          </div>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default ProfilePage;

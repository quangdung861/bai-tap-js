import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { ROUTES } from "../../constants/routes";

import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/user/actions";

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm] = Form.useForm();

  const { loginData } = useSelector((state) => state.userReducer);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          redirectHome: () => navigate(ROUTES.USER.HOME),
          redirectDashboard: () => navigate(ROUTES.ADMIN.DASHBOARD)
        },
      })
    );
  };

  return (
    <>
      <S.LoginContainer>
        <S.LoginContent>
          <div className="login-form">
            <div className="login-title">Đăng nhập</div>
            <Form
              layout="vertical"
              name="loginForm"
              form={loginForm}
              onFinish={(values) => handleLogin(values)}
            >
              <Form.Item
                className="form-item"
                name="email"
                type="email"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập email",
                  },
                ]}
              >
                <Input
                  style={{ height: 40 }}
                  placeholder="Email/Số điện thoại/Tên đăng nhập"
                />
              </Form.Item>
              <Form.Item
                className="form-item"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập mật khẩu",
                  },
                ]}
              >
                <Input.Password style={{ height: 40 }} placeholder="Mật khẩu" />
              </Form.Item>

              {loginData.errors && (
                <div
                  className="errors"
                  style={{
                    marginBottom: 10,
                    textAlign: "right",
                    color: "#ee4d2d",
                  }}
                >
                  {loginData.errors}
                </div>
              )}

              <Form.Item style={{ marginBottom: 10 }}>
                <Button
                  style={{ width: "100%", height: 40 }}
                  type="primary"
                  htmlType="submit"
                >
                  ĐĂNG NHẬP
                </Button>
              </Form.Item>
            </Form>

            <div
              className="forget-password"
              style={{ textAlign: "right", marginBottom: 4 }}
            >
              <a>
                <span style={{ fontSize: 12 }}>Quên mật khẩu</span>
              </a>
            </div>

            <div className="space-line">
              <div className="line" />
              <span>HOẶC</span>
              <div className="line" />
            </div>

            <div className="login-other">
              <Button>
                <img src="https://www.facebook.com/images/fb_icon_325x325.png" />
                <span>Facebook</span>
              </Button>
              <Button>
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" />
                <span>Google</span>
              </Button>
              <Button>
                <img src="https://media.idownloadblog.com/wp-content/uploads/2018/07/Apple-logo-black-and-white.png" />
                <span>Apple</span>
              </Button>
            </div>

            <div className="navigate-login">
              <span>
                Bạn mới biết đến De Vinc?{" "}
                <span
                  onClick={() => navigate(ROUTES.USER.REGISTER)}
                  style={{ color: "#ee4d2d", cursor: "pointer" }}
                >
                  Đăng ký
                </span>
              </span>
            </div>
          </div>
        </S.LoginContent>
      </S.LoginContainer>
    </>
  );
};

export default LoginPage;

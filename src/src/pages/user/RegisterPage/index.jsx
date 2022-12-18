import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { ROUTES } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../../redux/user/actions/user.action";

import * as S from "./styles";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerForm] = Form.useForm();

  const { registerData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (registerData.errors?.password) {
      registerForm.setFields([
        {
          name: "password",
          errors: [registerData.errors.password],
        },
      ]);
    }
    if (registerData.errors?.email) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.errors.email],
        },
      ]);
    }
  }, [registerData.errors]);

  const handleRegister = (values) => {
    dispatch(
      registerAction({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
        },
        callback: {
          redirectLogin: () => navigate(ROUTES.LOGIN),
        },
      })
    );
  };

  return (
    <>
      <S.RegisterContainer>
        <S.RegisterContent>
          <div className="register-form">
            <div className="register-title">Đăng ký</div>
            <Form
              layout="vertical"
              form={registerForm}
              name="register"
              initialValues={{ remember: true }}
              onFinish={(values) => handleRegister(values)}
            >
              <Form.Item
                className="form-item"
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập Họ và tên",
                  },
                ]}
              >
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item
                className="form-item"
                name="email"
                label="Email:"
                rules={[
                  {
                    type: "email",
                    message: "Email chưa đúng định dạng",
                  },
                  {
                    required: true,
                    message: "Bạn chưa nhập email",
                  },
                ]}
              >
                <Input style={{ height: 40 }} />
              </Form.Item>

              <Form.Item
                className="form-item"
                name="password"
                label="Mật khẩu:"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập mật khẩu",
                  },
                ]}
              >
                <Input.Password style={{ height: 40 }} />
              </Form.Item>

              <Form.Item
                className="form-item"
                name="confirm"
                label="Nhập lại mật khẩu:"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Xác nhận mật khẩu không khớp",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Hai mật khẩu bạn đã nhập không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password style={{ height: 40 }} />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%", height: 40 }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
            </Form>

            <div className="space-line">
              <div className="line" />
              <span>HOẶC</span>
              <div className="line" />
            </div>
            <div className="register-other">
              <Button>
                <img src="https://www.facebook.com/images/fb_icon_325x325.png" />
                <span>Facebook</span>
              </Button>
              <Button>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  alt=""
                />
                <span>Google</span>
              </Button>
            </div>

            <div className="policy">
              <p> Bằng việc đăng kí, bạn đã đồng ý với De Vinc về</p>
              <span>
                <a href="">Điều khoản và dịch vụ</a> &{" "}
                <a href="">Chính sách bảo mật</a>
              </span>
            </div>

            <div className="navigate-login">
              <span>
                Bạn đã có tài khoản?{" "}
                <span
                  onClick={() => navigate(ROUTES.LOGIN)}
                  style={{ color: " #ee4d2d", cursor: "pointer" }}
                >
                  Đăng nhập
                </span>
              </span>
            </div>
          </div>
        </S.RegisterContent>
      </S.RegisterContainer>
    </>
  );
};

export default RegisterPage;

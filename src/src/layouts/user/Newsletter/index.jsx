import React, { useEffect } from "react";

import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewsletterListAction,
  addNewsletterAction,
} from "../../../redux/user/actions";
import * as S from "./styles";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [newsletterForm] = Form.useForm();

  const { newsletterList } = useSelector((state) => state.newsletterReducer);

  useEffect(() => {
    dispatch(getNewsletterListAction());
  }, []);

  const handleNewsletter = (values) => {
    const existNewletter = newsletterList.data.findIndex(
      (item) => item.email === values.newsletter
    );
    if (existNewletter === -1) {
      dispatch(
        addNewsletterAction({
          email: values.newsletter,
          callback: {
            resetNewsletterForm: () => newsletterForm.resetFields()
          }
        })
      );
    } else {
      message.warning("Email đã tồn tại")
    }
  };

  return (
    <S.NewsletterContainer>
      <S.NewsletterContent>
        <Form
          form={newsletterForm}
          name="newsletterForm"
          onFinish={(values) => handleNewsletter(values)}
        >
          <div className="header-title">ĐĂNG KÝ NHẬN BẢN TIN</div>
          <div className="form-newsletter">
            <div className="input-group">
              <Form.Item
                name="newsletter"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập tên sản phẩm",
                  },
                  {
                    type: "email",
                    message: "Email không đúng định dạng",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "380px",
                    height: "45px",
                    textAlign: "center",
                  }}
                  placeholder="Nhập địa chỉ email"
                />
              </Form.Item>
              <Button  htmlType="submit">
                ĐĂNG KÝ
              </Button>
            </div>
          </div>
        </Form>
      </S.NewsletterContent>
    </S.NewsletterContainer>
  );
};

export default Newsletter;

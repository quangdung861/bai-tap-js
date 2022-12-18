import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

import * as S from "./styles";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Đơn hàng của bạn đã được tiếp nhận và đang tiến hành xử lý giao hàng."
        style={{ paddingTop: "8rem" }}
        extra={[
          <Button
            danger
            type="primary"
            style={{ width: "12rem", height: "2.5rem" }}
            key="success"
            onClick={() => navigate(ROUTES.USER.HOME)}
          >
            TIẾP TỤC MUA SẮM
          </Button>,
        ]}
      />
    </S.Wrapper>
  );
};

export default SuccessPage;

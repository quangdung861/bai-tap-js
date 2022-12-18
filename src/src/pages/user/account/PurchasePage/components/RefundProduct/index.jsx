import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../../../../../constants/routes";
import { getOrderListAction } from "../../../../../../redux/user/actions";

import * as S from "./styles";

const RefundProduct = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderList } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (userInfo.data?.id) {
      dispatch(getOrderListAction({ userId: userInfo.data.id }));
    }
  }, [userInfo]);

  const renderOderList = () => {
    return orderList.data.map((item) => {
      if (  item.orderStatus ===
        "TRẢ HÀNG/HOÀN TIỀN") {
        const orderProductItem = item.orderProducts.map((productItem) => {
          const DetailOrderProductImages = item.orderProductImages.filter(
            (imageItem) => imageItem.productId === productItem.productId
          );
          return (
            <Row
              style={{ paddingTop: 12, display: "flex", alignItems: "center" }}
              key={productItem.id}
            >
              <Col span={20}>
                <Row>
                  <Col span={4}>
                    <div>
                      <img
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                        src={DetailOrderProductImages[0].url}
                        alt=""
                      />
                    </div>
                  </Col>
                  <Col span={20}>
                    <Row style={{ marginBottom: 5, color: "black" }}>
                      <Col span={24}>{productItem.productName}</Col>
                    </Row>
                    {productItem.optionName && (
                      <Row style={{ marginBottom: 5 }}>
                        <Col span={24} style={{ fontSize: 13, color: "#817f7f" }}>
                          Phân loại hàng:
                        </Col>
                      </Row>
                    )}
                    <Row style={{ marginBottom: 5 }}>
                      <Col span={24} style={{ fontSize: 13, color: "black" }}>
                        X{productItem.quantity}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      marginBottom: 3,
                      color: "rgb(238, 77, 45)",
                      fontSize: "8px",
                    }}
                  >
                    <span>₫</span>
                  </div>
                  <span style={{ color: "rgb(238, 77, 45)" }}>
                    {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              </Col>
            </Row>
          );
        });

        return (
          <Row key={item.id}>
            <Col
              span={24}
              style={{
                backgroundColor: "white",
                marginBottom: "2px",
                marginTop: "12px",
                padding: "24px",
                borderRadius: "3px",
              }}
            >
              <Row
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  paddingBottom: 12,
                }}
              >
                {item.deliveryStatus && (
                  <>
                    <img
                      style={{ width: "2%", marginRight: "8px" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1QbDQjowadwcZ8qWXSp8XZl-7LeJ8uK4VUceAPvkaNd4BUI5QwtlQMWqBuRe-HjXbRM&usqp=CAU"
                      alt=""
                    />
                    <div
                      style={{ color: "rgb(38, 170, 153)", marginRight: "8px" }}
                    >
                      {item.deliveryStatus}
                    </div>
                    <QuestionCircleOutlined
                      style={{ color: "#6b6a6a", marginRight: "8px" }}
                    />
                  </>
                )}
                <div style={{ color: "rgb(238, 77, 45)" }}>
                  {item.orderStatus}
                </div>
              </Row>
              <Row>
                <Col span={24}>
                  <div style={{ borderBottom: "1px solid #ccc" }}></div>
                </Col>
              </Row>
              {/* // */}
              <Link
              to={generatePath(ROUTES.USER.ORDER_DETAIL, {
                id: item.id,
              })}
            >
              {orderProductItem}
            </Link>
            </Col>
            {/* // */}
            <Col span={24} style={{ backgroundColor: "rgb(255, 254, 251)" }}>
              <Row>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "24px 24px 12px 24px",
                  }}
                >
                  <div
                    style={{
                      marginTop: 6,
                      marginRight: 12,
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "5%",
                        marginBottom: "2px",
                        marginRight: "8px",
                      }}
                      src="https://www.shareicon.net/data/2016/10/29/849336_dollar_512x512.png"
                      alt=""
                    />
                    <div>Tổng số tiền:</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginBottom: 3, color: "rgb(238, 77, 45)" }}>
                      <span>₫</span>
                    </div>
                    <span style={{ color: "rgb(238, 77, 45)", fontSize: 24 }}>
                      {item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 24px 24px 24px",
                  borderRadius: "3px",
                }}
              >
                <div>
                  <div>
                    <div>Đánh giá sản phẩm trước 09-12-2022</div>
                  </div>
                  <div style={{ color: "rgb(238, 77, 45)" }}>
                    Thanh toán bằng hình thức{" "}
                    {item.method === "cod"
                      ? "COD"
                      : item.method === "credit" && "Thẻ tín dụng"}
                  </div>
                </div>
                <div>
                  <Button
                    style={{ marginRight: 8, width: 150, height: 40 }}
                    type="primary"
                    danger
                  >
                    Đánh Giá
                  </Button>
                  <Button style={{ marginRight: 8, width: 150, height: 40 }}>
                    Liên Hệ Người Bán
                  </Button>
                  <Button style={{ width: 150, height: 40 }}>Mua Lại</Button>
                </div>
              </Row>
            </Col>
          </Row>
        );
      }
    });
  };

  return <S.Wrapper>{renderOderList()}</S.Wrapper>;
};

export default RefundProduct;

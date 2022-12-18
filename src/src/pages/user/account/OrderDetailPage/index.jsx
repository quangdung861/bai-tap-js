import React, { useEffect, useState } from "react";
import { useParams, generatePath, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Avatar,
  Skeleton,
  Space,
  Steps,
  Tag,
  Tooltip,
} from "antd";
import {
  LeftOutlined,
  ProfileOutlined,
  DollarCircleOutlined,
  CarOutlined,
  DownloadOutlined,
  StarOutlined,
  WechatOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  BellOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../../../../constants/routes";
import { getOrderDetailAction } from "../../../../redux/user/actions";
import moment from "moment";

import * as S from "./styles";
const OrderDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  let orderId = parseInt(id);

  const [activeLineFinish, setActiveLineFinish] = useState(1);
  const [stepDelivery, setStepDelivery] = useState(0);

  const { orderDetail } = useSelector((state) => state.orderReducer);
  console.log(
    "🚀 ~ file: index.jsx ~ line 44 ~ OrderDetailPage ~ orderDetail",
    orderDetail
  );

  useEffect(() => {
    dispatch(getOrderDetailAction({ orderId }));
  }, [orderId]);

  const items = [
    {
      title: "Chờ lấy hàng",
      description: "09:16 31-10-2022",
    },
    {
      title: "Đang lấy hàng",
      description: "09:16 31-10-2022",
    },
    {
      title: "Đơn hàng đã xuất kho",
      description: "09:16 31-10-2022",
    },
    {
      title: "Đang giao hàng",
      description: "09:16 31-10-2022",
    },
    {
      title: "Giao hàng thành công",
      description: "09:16 31-10-2022",
    },
  ];

  const renderOrderProductItem = () => {
    return orderDetail.data.orderProducts?.map((item) => {
      const DetailOrderProductImages =
        orderDetail.data.orderProductImages.filter(
          (imageItem) => imageItem.productId === item.productId
        );
      return (
        <Link key={item.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flex: 1, paddingRight: 12 }}>
              <div>
                <img
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                  src={DetailOrderProductImages[0].url}
                  alt=""
                />
              </div>
              <div style={{ paddingLeft: 12, color: "black" }}>
                <div style={{ fontSize: 16, lineHeight: "24px" }}>
                  {item.productName}
                </div>
                <div style={{ color: "rgba(0,0,0,.54)" }}>
                  Phân loại hàng: {item.optionName}
                </div>
                <div>X{item.quantity}</div>
              </div>
            </div>
            <div
              style={{ textAlign: "right", color: "#ee4d2d", display: "flex" }}
            >
              <div style={{ fontSize: 10 }}>₫</div>
              {item.price.toLocaleString()}
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <S.Wrapper activeLineFinish={orderDetail.data.orderStatus}>
      <Row gutter={[16, 16]}>
        <Col md={4} sm={24} xs={24} className="sidebar">
          <Sidebar orderId={orderId} />
        </Col>
        <Col md={20} sm={24} xs={24}>
          <Row>
            <Col
              md={24}
              style={{
                justifyContent: "space-between",
                display: "flex",
                padding: "20px 24px",
                backgroundColor: "white",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <Space
                style={{ color: "rgba(0,0,0,.54)", cursor: "pointer" }}
                onClick={() => navigate(ROUTES.USER.PURCHASE)}
              >
                <LeftOutlined />
                <span>TRỞ LẠI</span>
              </Space>
              <Space>
                <span>ID ĐƠN HÀNG. 221030QANXPEKG</span>
                <span style={{ margin: " 0px 16px" }}>|</span>
                <span style={{ color: "#ee4d2d" }}>
                  ĐƠN HÀNG {orderDetail.data.orderStatus}
                </span>
              </Space>
            </Col>
            <Col
              md={24}
              style={{
                width: "100%",
                borderBottom: "1px dotted rgba(0,0,0,.09)",
              }}
            ></Col>
            <Col
              md={24}
              style={{
                padding: "40px 24px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            >
              <div className="stepper">
                <div className="stepper__step--finish">
                  <div className="stepper__step--icon icon__1">
                    <ProfileOutlined />
                  </div>
                  <div className="stepper__step--text">Đơn Hàng Đã Đặt</div>
                  <div className="stepper__step--date">
                    {orderDetail.data &&
                      orderDetail.data.createdAt &&
                      moment(orderDetail.data.createdAt).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                  </div>
                </div>

                <div className="stepper__step--finish">
                  <div className="stepper__step--icon icon__2">
                    <DollarCircleOutlined />
                  </div>
                  <div className="stepper__step--text">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].confirm}
                  </div>
                  <div className="stepper__step--date">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].createConfirmAt &&
                      moment(
                        orderDetail.data.statusDetailOrders[0].createConfirmAt
                      ).format("HH:mm DD/MM/YYYY")}
                  </div>
                </div>

                <div className="stepper__step--finish">
                  <div className="stepper__step--icon icon__3">
                    <CarOutlined />
                  </div>
                  <div className="stepper__step--text">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].delivery}
                  </div>
                  <div className="stepper__step--date">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].createDeliveryAt &&
                      moment(
                        orderDetail.data.statusDetailOrders[0].createDeliveryAt
                      ).format("HH:mm DD/MM/YYYY")}
                  </div>
                </div>

                <div className="stepper__step--finish">
                  <div className="stepper__step--icon icon__4 ">
                    <DownloadOutlined />
                  </div>
                  <div className="stepper__step--text">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].delivering}
                  </div>
                  <div className="stepper__step--date">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0]
                        .createDeliveringAt &&
                      moment(
                        orderDetail.data.statusDetailOrders[0]
                          .createDeliveringAt
                      ).format("HH:mm DD/MM/YYYY")}
                  </div>
                </div>

                <div className="stepper__step--finish">
                  <div className="stepper__step--icon icon__5">
                    <StarOutlined />
                  </div>
                  <div className="stepper__step--text">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].review}
                  </div>
                  <div className="stepper__step--date">
                    {orderDetail.data.statusDetailOrders &&
                      orderDetail.data.statusDetailOrders[0].createReviewAt &&
                      moment(
                        orderDetail.data.statusDetailOrders[0].createReviewAt
                      ).format("HH:mm DD/MM/YYYY")}
                  </div>
                </div>
              </div>
              <div className="stepper__line">
                <div className="stepper__line step__default"></div>
                <div className="stepper__line step__overwrite"></div>
              </div>
            </Col>
            <Col
              md={24}
              style={{
                width: "100%",
                borderBottom: "1px dotted rgba(0,0,0,.09)",
              }}
            ></Col>
            <Col
              md={24}
              style={{
                padding: "12px 24px",
                background: "#FFFCF5",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <div style={{ color: "rgba(0,0,0,.54)", fontSize: 12 }}>
                <span>
                  Thank you for rating. You can edit your rating once by &nbsp;
                </span>
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  02-12-2022
                </span>
              </div>
              <Link>
                <Button
                  type="primary"
                  danger
                  style={{ width: 220, height: 40 }}
                >
                  Mua Lại
                </Button>
              </Link>
            </Col>
            <Col
              md={24}
              style={{
                width: "100%",
                borderBottom: "1px dotted rgba(0,0,0,.09)",
              }}
            ></Col>
            <Col
              md={24}
              style={{
                padding: "12px 24px",
                background: "#FFFCF5",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <Button style={{ width: 220, height: 40 }}>
                Liên Hệ Người Bán
              </Button>
            </Col>
            <Col
              md={24}
              style={{
                borderBottom: "1px dotted rgba(0,0,0,.05)",
              }}
            ></Col>
            <Col
              md={24}
              style={{
                padding: "12px 24px",
                background: "#FFFCF5",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <Button style={{ width: 220, height: 40 }}>Xem Đánh Giá</Button>
            </Col>
            <Col md={24} style={{ padding: "3px 0px" }}>
              <div className="line__box"></div>
            </Col>
            {/* /// */}
            <Col
              md={24}
              style={{
                padding: "20px 24px 24px",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 20 }}>Địa Chỉ Nhận Hàng</span>
                <div
                  style={{
                    color: "rgba(0,0,0,.54)",
                    fontSize: 12,
                    lineHeight: "14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div>{orderDetail.data.deliveryName}</div>
                  <div>GATHPAKU</div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    color: "rgba(0,0,0,.54)",
                    fontSize: 12,
                    padding: "10px 24px 0px 0px",
                    flexShrink: 0,
                    width: 320,
                  }}
                >
                  <div style={{ color: "black" }}>
                    {orderDetail.data.fullName}
                  </div>
                  <div>{orderDetail.data.phoneNumber}</div>
                  <div>
                    {orderDetail.data.address},&nbsp;{orderDetail.data.wardName}
                    ,&nbsp;
                    {orderDetail.data.districtName},&nbsp;
                    {orderDetail.data.cityName}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "4px 0px 0px 24px",
                    borderLeft: " 1px solid rgba(0,0,0,.09)",
                  }}
                >
                  <Steps
                    progressDot
                    current={1}
                    direction="vertical"
                    size="small"
                    items={items}
                  />
                </div>
              </div>
            </Col>
            <Col
              md={24}
              style={{
                borderBottom: "1px dotted rgba(0,0,0,.05)",
              }}
            ></Col>
            <Col
              md={24}
              style={{
                padding: "12px 24px",
                borderRadius: 5,
                backgroundColor: "white",
              }}
            >
              <div style={{ fontSize: 12, color: "rgba(0,0,0,.54)" }}>
                Lưu ý
              </div>
              <div></div>
            </Col>
            <Col
              md={24}
              style={{ backgroundColor: "#FAFAFA", padding: "12px 24px" }}
            >
              <div
                style={{
                  paddingBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <Space>
                    <Tag color="#EE4D2D" style={{ lineHeight: "16px" }}>
                      Yêu thích
                    </Tag>
                    <div>De Vinc Store</div>
                    <Tag color="#EE4D2D">
                      <WechatOutlined
                        style={{ marginRight: 5, lineHeight: "20px" }}
                      />
                      Chat
                    </Tag>
                    <Link>
                      <Tag>
                        <HomeOutlined
                          style={{ marginRight: 5, lineHeight: "20px" }}
                        />
                        Xem Shop
                      </Tag>
                    </Link>
                  </Space>
                </div>
                <div>
                  <InfoCircleOutlined style={{ color: "#ccc" }} />
                </div>
              </div>

              <div
                style={{
                  borderBottom: "1px dotted rgba(0,0,0,.05)",
                  width: "100%",
                }}
              ></div>

              {renderOrderProductItem()}
            </Col>
            <Col
              md={24}
              style={{
                borderTop: "1px solid rgba(0,0,0,.09)",
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  padding: "0px 24px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "13px 10px",
                    color: "rgba(0,0,0,.54)",
                    fontSize: 12,
                  }}
                >
                  Tổng tiền hàng
                </div>
                <div
                  style={{
                    width: 240,
                    justifyContent: "right",
                    padding: "13px 0 13px 10px",
                    borderLeft: "1px dotted rgba(0,0,0,.09)",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ fontSize: 10 }}>₫</div>
                  {orderDetail.data.provisionalPrice?.toLocaleString()}
                </div>
              </div>
            </Col>

            {!!orderDetail.data.discountProvisionalPrice && (
              <Col
                md={24}
                style={{
                  borderTop: "1px solid rgba(0,0,0,.09)",
                  backgroundColor: "#FAFAFA",
                }}
              >
                <div
                  style={{
                    padding: "0px 24px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "13px 10px",
                      color: "rgba(0,0,0,.54)",
                      fontSize: 12,
                    }}
                  >
                    Giảm giá
                  </div>
                  <Tooltip title="Đã áp dụng Mã giảm giá">
                    <InfoCircleOutlined
                      style={{
                        paddingRight: " 10px",
                        color: "rgba(0,0,0,.54)",
                      }}
                    />
                  </Tooltip>
                  <div
                    style={{
                      width: 240,
                      justifyContent: "right",
                      padding: "13px 0 13px 10px",
                      borderLeft: "1px dotted rgba(0,0,0,.09)",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ fontSize: 10 }}>-₫</div>
                    {orderDetail.data.discountProvisionalPrice?.toLocaleString()}
                  </div>
                </div>
              </Col>
            )}

            <Col
              md={24}
              style={{
                borderTop: "1px solid rgba(0,0,0,.09)",
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  padding: "0px 24px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "13px 10px",
                    color: "rgba(0,0,0,.54)",
                    fontSize: 12,
                  }}
                >
                  Phí vận chuyển
                </div>
                <div
                  style={{
                    width: 240,
                    justifyContent: "right",
                    padding: "13px 0 13px 10px",
                    borderLeft: "1px dotted rgba(0,0,0,.09)",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ fontSize: 10 }}>₫</div>
                  {orderDetail.data.deliveryPrice?.toLocaleString()}
                </div>
              </div>
            </Col>

            {!!orderDetail.data.discountDeliveryPrice && (
              <Col
                md={24}
                style={{
                  borderTop: "1px solid rgba(0,0,0,.09)",
                  backgroundColor: "#FAFAFA",
                }}
              >
                <div
                  style={{
                    padding: "0px 24px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "13px 10px",
                      color: "rgba(0,0,0,.54)",
                      fontSize: 12,
                    }}
                  >
                    Giảm giá phí vận chuyển
                  </div>
                  <Tooltip title="Đã áp dụng Mã miễn phí vận chuyển">
                    <InfoCircleOutlined
                      style={{
                        paddingRight: " 10px",
                        color: "rgba(0,0,0,.54)",
                      }}
                    />
                  </Tooltip>
                  <div
                    style={{
                      width: 240,
                      justifyContent: "right",
                      padding: "13px 0 13px 10px",
                      borderLeft: "1px dotted rgba(0,0,0,.09)",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ fontSize: 10 }}>-₫</div>
                    {orderDetail.data.discountDeliveryPrice?.toLocaleString()}
                  </div>
                </div>
              </Col>
            )}

            <Col
              md={24}
              style={{
                borderTop: "1px solid rgba(0,0,0,.09)",
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  padding: "0px 24px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "13px 10px",
                    color: "rgba(0,0,0,.54)",
                    fontSize: 12,
                  }}
                >
                  Tổng số tiền
                </div>
                <div
                  style={{
                    width: 240,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    padding: "13px 0 13px 10px",
                    fontSize: 24,
                    color: "#ee4d2d",
                    borderLeft: "1px dotted rgba(0,0,0,.09)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>₫</span>
                  {orderDetail.data.totalPrice?.toLocaleString()}
                </div>
              </div>
            </Col>
            <Col
              md={24}
              style={{
                borderBottomRightRadius: "2px",
                borderBottomLeftRadius: "2px",
                fontSize: 12,
                paddingBottom: "5px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  border: "1px solid  rgba(224,168,0,.4)",
                  backgroundColor: "#FFFEFB",
                  padding: "12px 23px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BellOutlined
                  style={{ color: "#FFBF00", marginRight: 8, fontSize: 16 }}
                />
                <div style={{ color: "rgba(0,0,0,.54)" }}>
                  Vui lòng thanh toán
                  <span style={{ color: "#ee4d2d" }}>
                    &nbsp; ₫{orderDetail.data.totalPrice?.toLocaleString()}
                  </span>
                  &nbsp;khi nhận hàng.
                </div>
              </div>
            </Col>
            <Col
              md={24}
              style={{
                borderTop: "1px solid rgba(0,0,0,.09)",
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                style={{
                  padding: "0px 24px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  color: "rgba(0,0,0,.54)",
                }}
              >
                <div
                  style={{
                    padding: "13px 10px",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SafetyOutlined
                    style={{
                      fontSize: 20,
                      color: "#ee4d2d",
                      marginRight: 5,
                      marginBottom: 2,
                    }}
                  />
                  <span>Phương thức Thanh toán</span>
                </div>
                <div
                  style={{
                    width: 240,
                    textAlign: "right",
                    padding: "13px 0 13px 10px",
                    borderLeft: "1px dotted rgba(0,0,0,.09)",
                  }}
                >
                  {orderDetail.data.method === "credit"
                    ? "Thanh toán bằng thẻ tín dụng"
                    : "Thanh toán khi nhận hàng"}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default OrderDetailPage;

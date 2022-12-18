import React, { useEffect, useState } from "react";
import Header from "../../../layouts/admin/Header";
import {
  Button,
  Space,
  Tabs,
  Tag,
  Table,
  Pagination,
  Avatar,
  Row,
  Col,
  Modal,
  Radio,
  Form,
  Input,
  Skeleton,
} from "antd";
import {
  QuestionCircleOutlined,
  CarOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useNavigate, generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_TABLE_LIMIT } from "../../../constants/pagination";
import {
  getOrderListAction,
  //
  handleOrderItemAction,
} from "../../../redux/user/actions";
import { DELIVERY_LIST } from "./constant/constant";
import moment from "moment/moment";

import * as S from "./styles";
const OrderPageAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderList } = useSelector((state) => state.orderReducer);
  const [deliveryFrom] = Form.useForm();

  const { confirm } = Modal;

  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] =
    useState(false);
  const [orderId, setOrderId] = useState();
  console.log(
    "🚀 ~ file: index.jsx ~ line 37 ~ OrderPageAdmin ~ orderList",
    orderList
  );

  useEffect(() => {
    dispatch(getOrderListAction({}));
  }, []);

  const handleOder = ({
    id,
    params,
    messageOrder,
    paramsStatusDetailOrders,
    callback,
  }) => {
    dispatch(
      handleOrderItemAction({
        id,
        params,
        messageOrder,
        paramsStatusDetailOrders,
        callback,
      })
    );
  };

  const renderDeliveryList = () => {
    return DELIVERY_LIST.map((item, index) => {
      let lastPrice = item.price;
      if (item.discount !== 0) {
        lastPrice = item.price - item.discount;
      }

      return (
        <Row key={index}>
          <Col
            span={6}
            style={{
              padding: "10px 16px",
            }}
          >
            <img src={item.image} alt="" />
          </Col>
          <Col span={6}>
            <Form.Item
              name="deliveryName"
              style={{ margin: "20px 0px 0px 0px" }}
            >
              <Radio.Group>
                <Radio
                  style={{
                    padding: "10px 16px",
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                  value={item.name}
                >
                  {item.name}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col
            span={6}
            style={{
              padding: "10px 16px",
              alignSelf: "center",
            }}
          >
            {item.intendTime}
          </Col>
          <Col
            span={6}
            style={{
              padding: "10px 16px",
              alignSelf: "center",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {item.discount !== 0 ? (
              <Space>
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  {item.price.toLocaleString()}
                </span>

                <span>{lastPrice.toLocaleString()}</span>
              </Space>
            ) : (
              item.price.toLocaleString()
            )}
          </Col>
        </Row>
      );
    });
  };

  const renderOderList = () => {
    return orderList.data.map((item) => {
      let btn = undefined;
      switch (item.orderStatus) {
        case "CHỜ LẤY HÀNG":
          btn = (
            <>
              <Button
                style={{ marginRight: 8, width: 250, height: 40 }}
                onClick={() => {
                  setIsModalDeliveryOpen(true);
                  setOrderId(item.id);
                }}
              >
                <CarOutlined />
                Đẩy qua hãng vận chuyển
              </Button>
              <Modal
                open={isModalDeliveryOpen}
                onCancel={() => setIsModalDeliveryOpen(false)}
                width={800}
                footer={[
                  <div key="footer-modal-delivery">
                    <Button onClick={() => setIsModalDeliveryOpen(false)}>
                      Huỷ
                    </Button>
                    <Button type="danger" onClick={() => deliveryFrom.submit()}>
                      Áp dụng
                    </Button>
                  </div>,
                ]}
              >
                <Row>
                  <Col span={24}>
                    <div style={{ marginBottom: 10, fontSize: 16 }}>
                      Đóng gói và giao hàng
                    </div>
                  </Col>
                  <Col span={24}>
                    <p style={{ fontWeight: 500, marginBottom: "12px" }}>
                      Chi phí vận chuyển ước tính của các gói cước
                    </p>
                  </Col>

                  <Col span={24}>
                    <Row>
                      <Col
                        span={6}
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: "10px 16px",
                          fontWeight: 500,
                        }}
                      >
                        Đối tác vận chuyển
                      </Col>
                      <Col
                        span={6}
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: "10px 16px",
                          fontWeight: 500,
                        }}
                      >
                        Dịch vụ
                      </Col>
                      <Col
                        span={6}
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: "10px 16px",
                          fontWeight: 500,
                        }}
                      >
                        Thời gian vận chuyển
                      </Col>
                      <Col
                        span={6}
                        style={{
                          backgroundColor: "#F4F4F4",
                          padding: "10px 16px",
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        Phí dự kiến
                      </Col>
                    </Row>
                    <Col span={24}>
                      <Form
                        name="deliveryFrom"
                        form={deliveryFrom}
                        onFinish={(values) =>
                          handleOder({
                            id: orderId,
                            params: {
                              ...values,
                              orderStatus: "ĐANG GIAO",
                              deliveryStatus: "Đơn hàng đã xuất kho",
                            },
                            paramsStatusDetailOrders: {
                              id: item.statusDetailOrders[0].id,
                              delivery: "Đã Giao Cho DVVC",
                              createDeliveryAt: moment().valueOf(),
                            },
                            messageOrder: "Đẩy qua hãng vận chuyển thành công",
                            callback: {
                              closeModal: setIsModalDeliveryOpen(false),
                            },
                          })
                        }
                      >
                        {renderDeliveryList()}
                      </Form>
                    </Col>
                  </Col>
                </Row>
              </Modal>
            </>
          );
          break;
        case "ĐANG GIAO":
          btn = (
            <Button
              style={{ marginRight: 8, width: 150, height: 40 }}
              onClick={() =>
                handleOder({
                  id: item.id,
                  params: {
                    orderStatus: "ĐÃ GIAO",
                    deliveryStatus: "Giao hàng thành công",
                    paymentStatus: "Đã thanh toán",
                  },
                  paramsStatusDetailOrders: {
                    id: item.statusDetailOrders[0].id,
                    delivering: "Đơn Hàng Đã Nhận",
                    createDeliveringAt: moment().valueOf(),
                  },
                  messageOrder: "Xác nhận đã giao thành công",
                })
              }
            >
              Xác nhận đã giao
            </Button>
          );
          break;
        case "ĐÃ GIAO":
          btn = (
            <Button
              style={{ marginRight: 8, width: 150, height: 40 }}
              type="primary"
              onClick={() =>
                handleOder({
                  id: item.id,
                  params: {
                    orderStatus: "TRẢ HÀNG/HOÀN TIỀN",
                    paymentStatus: "Đã hoàn tiền",
                    deliveryStatus: "Trả hàng thành công",
                  },
                  messageOrder: "Đổi trả hàng thành công",
                })
              }
            >
              Đổi trả hàng
            </Button>
          );
          break;
        case "TRẢ HÀNG/HOÀN TIỀN":
          break;
        default:
          btn = item.orderStatus !== "ĐÃ HỦY" && (
            <Button
              style={{ marginRight: 8, width: 150, height: 40 }}
              type="primary"
              danger
              onClick={() =>
                handleOder({
                  id: item.id,
                  params: {
                    orderStatus: "CHỜ LẤY HÀNG",
                    deliveryStatus: "Người gửi đang chuẩn bị hàng",
                  },
                  paramsStatusDetailOrders: {
                    id: item.statusDetailOrders[0].id,
                    confirm: "Đã Xác Nhận Thông Tin Thanh Toán",
                    createConfirmAt: moment().valueOf(),
                  },
                  messageOrder: "Duyệt đơn thành công",
                })
              }
            >
              Duyệt Đơn
            </Button>
          );
      }

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
                  <div style={{ width: 80, height: 80 }}>
                    <img
                      style={{ width: "100%", height: 80, objectFit: "cover" }}
                      src={DetailOrderProductImages[0].url}
                      alt=""
                    />
                  </div>
                </Col>
                <Col span={20}>
                  <Row style={{ marginBottom: 5 }}>
                    <Col span={24}>{productItem.productName}</Col>
                  </Row>
                  {productItem.optionName && (
                    <Row style={{ marginBottom: 5 }}>
                      <Col span={24} style={{ fontSize: 13, color: "#817f7f" }}>
                        Phân loại hàng: {productItem.optionName}
                      </Col>
                    </Row>
                  )}
                  <Row style={{ marginBottom: 5 }}>
                    <Col span={24} style={{ fontSize: 13 }}>
                      x{productItem.quantity}
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
                  {productItem.price.toLocaleString()}
                </span>
              </div>
            </Col>
          </Row>
        );
      });

      return (
        <Row key={item.id} style={{ marginBottom: 16 }}>
          <Col
            span={24}
            style={{
              backgroundColor: "white",
              marginTop: "2px 0px",
              padding: "24px",
              borderRadius: "3px",
            }}
          >
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 12,
              }}
            >
              <div style={{ color: "#9e9e9e" }}>
                {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>

              <div style={{textAlign: "right"}}>
                {item.deliveryStatus &&
                  item.deliveryStatus !== "Đơn hàng đã hủy" && (
                    <span>
                      <img
                        style={{ width: "4%", marginRight: "8px" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1QbDQjowadwcZ8qWXSp8XZl-7LeJ8uK4VUceAPvkaNd4BUI5QwtlQMWqBuRe-HjXbRM&usqp=CAU"
                        alt=""
                      />
                      <span
                        style={{
                          color: "rgb(38, 170, 153)",
                          marginRight: "8px",
                        }}
                      >
                        {item.deliveryStatus}
                      </span>
                      <QuestionCircleOutlined
                        style={{ color: "#6b6a6a", marginRight: "8px" }}
                      />
                    </span>
                  )}

                <span style={{ color: "rgb(238, 77, 45)" }}>
                  {item.orderStatus}
                </span>
              </div>
            </Row>
            <Row>
              <Col span={24}>
                <div style={{ borderBottom: "1px solid #ccc" }}></div>
              </Col>
            </Row>
            {/* // */}
            {orderProductItem}
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
              <Col span={7}>
                <Row>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Tên:</span>
                    <span style={{ fontWeight: 500, marginLeft: 8 }}>
                      {item.fullName}
                    </span>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Tỉnh/Thành phố:</span>
                    <span style={{ fontWeight: 500, marginLeft: 8 }}>
                      {item.cityName}
                    </span>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Quận/Huyện:</span>
                    <span style={{ fontWeight: 500, marginLeft: 8 }}>
                      {item.districtName}
                    </span>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Phường/Xã:</span>
                    <span style={{ fontWeight: 500, marginLeft: 8 }}>
                      {item.wardName}
                    </span>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Địa chỉ:</span>
                    <span style={{ fontWeight: 500, marginLeft: 8 }}>
                      {item.address}
                    </span>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Số điện thoại:</span>
                    <span style={{ fontWeight: 500, marginLeft: 8 }}>
                      {item.phoneNumber}
                    </span>
                  </Col>
                </Row>
                <Row style={{ color: "rgb(238, 77, 45)" }}>
                  <Col span={24}>
                    Thanh toán bằng hình thức{" "}
                    {item.method === "cod"
                      ? "COD"
                      : item.method === "credit" && "Thẻ tín dụng"}
                  </Col>
                  <Col span={24}>{item.paymentStatus}</Col>
                </Row>
              </Col>
              <div>
                {btn}
                <Button style={{ width: 150, height: 40 }}>
                  Liên Hệ Người Mua
                </Button>
                {(item.orderStatus === "CHỜ XÁC NHẬN" ||
                  item.orderStatus === "CHỜ LẤY HÀNG") && (
                  <Button
                    style={{ width: 80, height: 40, marginLeft: 8 }}
                    onClick={() => {
                      confirm({
                        title: "Bạn có muốn hủy đơn hàng này không?",
                        icon: <ExclamationCircleFilled />,
                        content: "Bấm xác nhận để hủy",
                        okText: "Xác Nhận",
                        cancelText: "Hủy",
                        onOk() {
                          handleOder({
                            id: item.id,
                            params: {
                              orderStatus: "ĐÃ HỦY",
                              deliveryStatus: "Đơn hàng đã hủy",
                            },
                            messageOrder: "Hủy đơn thành công",
                          });
                        },
                      });
                    }}
                  >
                    Hủy Đơn
                  </Button>
                )}
              </div>
            </Row>
          </Col>
        </Row>
      );
    });
  };

  const items = [
    {
      label: <span style={{ padding: "6px 16px" }}>Tất cả đơn hàng</span>,
      key: "item-1",
      children: (
        <>
          <Skeleton active loading={orderList.loading}>
            <S.Wrapper>{renderOderList()}</S.Wrapper>
          </Skeleton>
        </>
      ),
    },
  ];

  return (
    <S.MainContainer>
      <Header breadcrumb="Danh sách đơn hàng" />
      <S.MainContent>
        <Tabs style={{ marginTop: 24 }} items={items} />
      </S.MainContent>
    </S.MainContainer>
  );
};

export default OrderPageAdmin;

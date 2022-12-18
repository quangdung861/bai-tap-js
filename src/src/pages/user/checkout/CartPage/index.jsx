import { useEffect, useMemo, useState } from "react";

import {
  generatePath,
  Link,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Row,
  Col,
  InputNumber,
  Popconfirm,
  Button,
  Tag,
  Space,
  Modal,
  Select,
  Form,
  Input,
  Card,
  Radio,
  Tooltip,
  Checkbox,
  notification,
  Result,
} from "antd";
import {
  ShakeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../../../../constants/routes";
import {
  deleteCartItemAction,
  updateCartItemAction,
  getVoucherListAction,
  voucherSelectAction,
  getVoucherShipListAction,
  voucherShipSelectAction,
  clearVoucherSelectedAction,
  clearVoucherShipSelectedAction,
} from "../../../../redux/user/actions";
import { SHIP_FEE } from "./constant/shipFee";

import voucher from "../../../../assets/images/voucher.png";
import voucherDisable from "../../../../assets/images/voucherDisable.png";
import voucherShip from "../../../../assets/images/voucherShip.png";
import voucherShipDisable from "../../../../assets/images/voucherShipDisable.png";

import approved from "../../../../assets/images/approved.jpg";
import approvedDisable from "../../../../assets/images/approvedDisable.png";
import * as S from "./styles";
const CartPage = () => {
  const { confirm } = Modal;

  const navigate = useNavigate();

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

  const { cartInfo } = Form.useForm();

  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cartReducer);
  const { voucherList, voucherSelected, voucherShipList, voucherShipSelected } =
    useSelector((state) => state.voucherReducer);

  let provisionalPrice = 0; // Giá tạm tính
  let voucherPrice = voucherSelected.id ? voucherSelected.discount : 0; // Giảm giá
  let voucherShipPrice = voucherShipSelected.id
    ? SHIP_FEE - voucherShipSelected.discount
    : SHIP_FEE; // Giảm giá vận chuyển
  let totalPrice = 0; // tổng giá

  useEffect(() => {
    dispatch(getVoucherListAction());
    dispatch(getVoucherShipListAction());
  }, []);

  const handleVoucher = ({ voucherId, condition }) => {
    if (provisionalPrice > condition) {
      dispatch(voucherSelectAction({ voucherId }));
    }
  };

  const handleVoucherShip = ({ voucherShipId, condition }) => {
    if (provisionalPrice > condition) {
      dispatch(voucherShipSelectAction({ voucherShipId }));
    }
  };

  const handleChangeQuantity = ({ productId, quantity, optionId }) => {
    dispatch(
      updateCartItemAction({
        productId,
        optionId,
        quantity,
      })
    );
  };

  const handleDeleteProductItem = ({ productId, optionId }) => {
    dispatch(
      deleteCartItemAction({
        productId,
        optionId,
      })
    );
  };

  const dataSource = cartList.map((item, index) => {
    provisionalPrice = provisionalPrice + item.price * item.quantity;
    totalPrice = provisionalPrice - voucherPrice + voucherShipPrice;
    return {
      ...item,
      finalPrice: item.price * item.quantity,
      key: `${item.productId}${item.optionId && `-${item.optionId}`}`,
      image: item.images[0].url,
    };
  });

  useEffect(() => {
    if (provisionalPrice < voucherSelected.condition) {
      dispatch(clearVoucherSelectedAction());
    }
    if (provisionalPrice < voucherShipSelected.condition) {
      dispatch(clearVoucherShipSelectedAction());
    }
  }, [provisionalPrice]);

  const renderVoucherList = () => {
    if (!voucherList.data.id) {
      return voucherList.data.map((item) => {
        return (
          <Row
            key={item.id}
            style={{
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.15)",
              height: "100%",
              borderRadius: 10,
              marginBottom: 12,
              ...(provisionalPrice > item.condition
                ? { cursor: "pointer" }
                : { color: "#8b8b8b" }),
              ...(voucherSelected.id === item.id && {
                border: "2px solid #999c03",
              }),
            }}
            onClick={() =>
              handleVoucher({ voucherId: item.id, condition: item.condition })
            }
          >
            <Col span={8}>
              <img
                style={{ width: "80%", height: "auto", padding: 8 }}
                src={
                  provisionalPrice > item.condition ? voucher : voucherDisable
                }
                alt=""
              />
            </Col>
            <Col span={16} style={{ padding: 12 }}>
              <Row justify="space-between">
                <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                  {item.name}
                </span>
                <Tooltip title="......">
                  <InfoCircleOutlined style={{ fontSize: 16 }} />
                </Tooltip>
              </Row>
              <Row>{item.content}</Row>
              <Row style={{ display: "flex", alignItems: "flex-end" }}>
                <Col span={16}>HSD: 31/12/22</Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <img
                    style={{ width: "70%", height: "auto" }}
                    src={
                      provisionalPrice > item.condition
                        ? approved
                        : approvedDisable
                    }
                    alt=""
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        );
      });
    }
  };

  const renderVoucherShipList = () => {
    if (!voucherShipList.data.id) {
      return voucherShipList.data.map((item) => {
        return (
          <Row
            key={item.id}
            style={{
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.15)",
              height: "100%",
              borderRadius: 10,
              marginBottom: 12,
              ...(provisionalPrice > item.condition
                ? { cursor: "pointer" }
                : { color: "#8b8b8b" }),
              ...(voucherShipSelected.id === item.id && {
                border: "2px solid #999c03",
              }),
            }}
            onClick={() =>
              handleVoucherShip({
                voucherShipId: item.id,
                condition: item.condition,
              })
            }
          >
            <Col span={8}>
              <img
                style={{ width: "80%", height: "auto", padding: 8 }}
                src={
                  provisionalPrice > item.condition
                    ? voucherShip
                    : voucherShipDisable
                }
                alt=""
              />
            </Col>
            <Col span={16} style={{ padding: 12 }}>
              <Row justify="space-between">
                <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                  {item.name}
                </span>
                <Tooltip title="......">
                  <InfoCircleOutlined style={{ fontSize: 16 }} />
                </Tooltip>
              </Row>
              <Row>{item.content}</Row>
              <Row style={{ display: "flex", alignItems: "flex-end" }}>
                <Col span={16}>HSD: 31/12/22</Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <img
                    style={{ width: "70%", height: "auto" }}
                    src={
                      provisionalPrice > item.condition
                        ? approved
                        : approvedDisable
                    }
                    alt=""
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        );
      });
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            maxWidth: "450px",
          }}
        >
          <div>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${record.slug}.${record.productId}`,
              })}
              style={{
                display: "flex",
                alignItems: "center",
                objectFit: "cover",
                overflow: "hidden",
                marginRight: 10,
              }}
            >
              <img
                style={{ width: 80, height: 80, objectFit: "cover" }}
                src={record.image}
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${record.slug}.${record.productId}`,
              })}
              style={{ display: "flex", alignItems: "center" }}
            >
              {record.name} {record.optionId && `- ${record.optionName}`}
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => {
        return (
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) =>
              handleChangeQuantity({
                productId: record.productId,
                quantity: value,
                ...(record.optionId && { optionId: record.optionId }),
              })
            }
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return `${price.toLocaleString()} ₫`;
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (finalPrice) => {
        return `${finalPrice.toLocaleString()} ₫`;
      },
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, record, index) => (
        <div
          style={{ color: "#FF424E", fontSize: "16px", cursor: "pointer" }}
          onClick={() =>
            confirm({
              title: "Xoá sản phẩm",
              icon: <ExclamationCircleOutlined />,
              content: "Bạn có muốn xóa sản phẩm đang chọn?",
              okText: "Xác nhận",
              okType: "primary",
              cancelText: "Hủy",
              onOk() {
                handleDeleteProductItem({
                  productId: record.productId,
                  ...(record.optionId && { optionId: record.optionId }),
                });
              },
            })
          }
        >
          <DeleteOutlined />
        </div>
      ),
    },
  ];

  return (
    <S.Wrapper>
      <h2 style={{ marginBottom: 12 }} className="title">
        GIỎ HÀNG
      </h2>
      {cartList.length === 0 ? (
        <Result
          status="404"
          title="Giỏ hàng của bạn còn trống"
          extra={
            <Button
              danger
              type="primary"
              style={{ width: "12rem", height: "2.5rem" }}
              onClick={() => navigate(ROUTES.USER.HOME)}
            >
              MUA NGAY
            </Button>
          }
        />
      ) : (
        <Form name="cartInfo" form={cartInfo}>
          <Row
            style={{
              display: "flex",
              alignItems: "flex-end",
              backgroundColor: "#fffefb",
              padding: "12px 16px",
              marginBottom: "12px",
              border: "1px solid rgba(224,168,0,.4)",
            }}
          >
            <img
              style={{ width: 22, marginRight: 8 }}
              src="data:image/png;base64,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"
              alt=""
            />
            <span>
              Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
              bạn nhé!
            </span>
          </Row>
          <Row gutter={[16, 16]}>
            <Col md={24} sm={24} xs={24}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </Col>

            <Col md={24} sm={24} xs={24}>
              {/* KHUYẾN MÃI */}
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "16px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <h3>KHUYẾN MÃI</h3>
                      <div
                        style={{
                          color: "#888888",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: 8 }}>Có thể chọn 2</span>
                        <InfoCircleOutlined />
                      </div>
                    </div>

                    <div>
                      <span
                        style={{
                          fontWeight: 500,
                          cursor: "pointer",
                          color: "#1890ff",
                        }}
                        onClick={showModal}
                      >
                        <Space>
                          <ShakeOutlined />
                          Chọn hoặc nhập Khuyến mãi khác
                        </Space>
                      </span>
                      <Modal
                        title="Khuyến Mãi"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[]}
                      >
                        <div
                          style={{
                            marginBottom: 12,
                            marginTop: "-12px",
                          }}
                        >
                          <p style={{ fontSize: 16 }}>Giảm Giá</p>
                          <span style={{ color: "#929191" }}>
                            Áp dụng tối đa: 1
                          </span>
                        </div>

                        {renderVoucherList()}

                        <div
                          style={{
                            marginBottom: 12,
                            marginTop: 24,
                          }}
                        >
                          <p style={{ fontSize: 16 }}>Mã Miễn Phí Vận Chuyển</p>
                          <span style={{ color: "#929191" }}>
                            Áp dụng tối đa: 1
                          </span>
                        </div>

                        {renderVoucherShipList()}
                      </Modal>
                    </div>

                    {voucherSelected.id && (
                      <Row
                        span={12}
                        style={{
                          boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.15)",
                          width: "40%",
                          borderRadius: 10,
                          margin: "12px 0",
                        }}
                      >
                        <Col span={8}>
                          <img
                            style={{ width: "80%", height: "auto", padding: 8 }}
                            src="https://cf.shopee.vn/file/680c03454d4a8e6510cde78faa437224_tn"
                            alt=""
                          />
                        </Col>
                        <Col span={16} style={{ padding: 12 }}>
                          <Row justify="space-between">
                            <h3>{voucherSelected.name}</h3>
                            <Tooltip title="......">
                              <InfoCircleOutlined style={{ fontSize: 16 }} />
                            </Tooltip>
                          </Row>
                          <Row>{voucherSelected.content}</Row>
                          <Row
                            style={{ display: "flex", alignItems: "flex-end" }}
                          >
                            <Col span={16}>HSD: 31/12/22</Col>
                            <Col span={8} style={{ textAlign: "right" }}>
                              <img
                                style={{ width: "70%", height: "auto" }}
                                src="https://t4.ftcdn.net/jpg/05/27/75/61/360_F_527756159_YXXK26Awmspcu2SkSv5GMhQJqG92gGy9.jpg"
                                alt=""
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )}

                    {voucherShipSelected.id && (
                      <Row
                        style={{
                          boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.15)",
                          width: "40%",
                          borderRadius: 10,
                          margin: "12px 0",
                        }}
                      >
                        <Col span={8}>
                          <img
                            style={{ width: "80%", height: "auto", padding: 8 }}
                            src="https://bizweb.dktcdn.net/100/430/173/articles/5b71ac781a93b-13-08-2018-39068341-434271643646069-8156772520129724416-n.png?v=1630321759030"
                            alt=""
                          />
                        </Col>
                        <Col span={16} style={{ padding: 12 }}>
                          <Row justify="space-between">
                            <h3>{voucherShipSelected.name}</h3>
                            <Tooltip title="......">
                              <InfoCircleOutlined style={{ fontSize: 16 }} />
                            </Tooltip>
                          </Row>
                          <Row>{voucherShipSelected.content}</Row>
                          <Row
                            style={{ display: "flex", alignItems: "flex-end" }}
                          >
                            <Col span={16}>HSD: 31/12/22</Col>
                            <Col span={8} style={{ textAlign: "right" }}>
                              <img
                                style={{ width: "70%", height: "auto" }}
                                src="https://t4.ftcdn.net/jpg/05/27/75/61/360_F_527756159_YXXK26Awmspcu2SkSv5GMhQJqG92gGy9.jpg"
                                alt=""
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )}
                  </div>
                </Col>
              </Row>

              {/* TỔNG TIỀN */}
              <Row>
                <Col
                  span={24}
                  style={{
                    backgroundColor: "white",
                    padding: "16px",
                    marginBottom: "12px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "320px",
                      width: "100%",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <span>Tạm tính</span>
                      {provisionalPrice !== 0 && (
                        <div style={{ fontWeight: 400, fontSize: 18 }}>
                          {provisionalPrice.toLocaleString()} đ
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <span>Giảm giá</span>
                      <div style={{ fontWeight: 400, fontSize: 18 }}>
                        {voucherSelected.id
                          ? `${voucherSelected.discount?.toLocaleString()} đ`
                          : `0 đ`}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <span>Vận chuyển</span>
                      <div style={{ fontWeight: 400, fontSize: 18 }}>
                        {cartList.length !== 0 &&
                          (voucherShipSelected.id ? (
                            <div>
                              <div style={{ textDecoration: "line-through" }}>
                                {SHIP_FEE.toLocaleString()} đ
                              </div>
                              <div style={{ textAlign: "right" }}>
                                {voucherShipPrice.toLocaleString()} đ
                              </div>
                            </div>
                          ) : (
                            <div>{SHIP_FEE.toLocaleString()} đ</div>
                          ))}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "12px",
                      }}
                    >
                      <span>Tổng tiền</span>
                      <div>
                        <div
                          style={{
                            color: "rgb(254, 56, 52)",
                            fontSize: 22,
                            fontWeight: 460,
                            textAlign: "right",
                          }}
                        >
                          {totalPrice.toLocaleString()} đ
                        </div>
                        <span>(Đã bao gồm VAT nếu có)</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* NÚT MUA */}
              <div
                style={{
                  marginBottom: "12px",
                  textAlign: "right",
                }}
              >
                <Button
                  style={{
                    width: "25%",
                    backgroundColor: "#FF424E",
                    color: "white",
                    height: "42px",
                  }}
                  onClick={() => navigate(ROUTES.USER.PAYMENT)}
                >
                  Mua Hàng ({cartList.length})
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </S.Wrapper>
  );
};

export default CartPage;

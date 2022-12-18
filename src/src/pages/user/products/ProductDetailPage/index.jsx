import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { useParams, generatePath, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  InputNumber,
  Radio,
  Col,
  Row,
  Form,
  Input,
  Card,
  Rate,
  Space,
  Tag,
  Breadcrumb,
  notification,
} from "antd";
import { CarOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";

import {
  getProductDetailAction,
  addToCartAction,
  favoriteProductAction,
  unFavoriteProductAction,
  getReviewListAction,
  postReviewAction,
  patchReviewAction,
  getReviewDetailAction,
  getProductListAction,
  getVoucherListAction,
  getVoucherShipListAction,
  getProductSoldAction,
} from "../../../../redux/user/actions";
import { ROUTES } from "../../../../constants/routes";
import { PRODUCT_DETAIL_LIMIT } from "../../../../constants/pagination";

import * as S from "./styles";
import moment from "moment";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [isShowFormReview, setIsShowFormReview] = useState(false);
  let { id } = useParams();
  let productId = parseInt(id.split(".")[1]);

  const dispatch = useDispatch();

  const [reviewForm] = Form.useForm();

  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);

  const { reviewList } = useSelector((state) => state.reviewReducer);
  const { reviewDetail } = useSelector((state) => state.reviewReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { orderProductSold } = useSelector((state) => state.orderReducer);
  
  const { voucherList, voucherShipList } = useSelector(
    (state) => state.voucherReducer
  );

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_DETAIL_LIMIT,
        },
      })
    );
    dispatch(getVoucherListAction());
    dispatch(getVoucherShipListAction());
    dispatch(getProductSoldAction({ productId }));
  }, []);

  const renderVoucher = voucherList.data.map((item) => {
    const formatDiscount = item.discount / 1000;
    return (
      <Tag key={item.id} color="volcano">
        Giảm ₫{formatDiscount}k
      </Tag>
    );
  });

  const renderVoucherShip = voucherShipList.data.map((item) => {
    return (
      <Tag key={item.id} color="volcano">
        Giảm ₫{item.discount.toLocaleString()}
      </Tag>
    );
  });

  const renderProductList = () => {
    return productList.data.map((item, index) => {
      let averageRateReview = 0;
      if (item.reviews.length !== 0) {
        let total = 0;
        for (let i = 0; i < item.reviews.length; i++) {
          total = total + item.reviews[i].rate;
          averageRateReview = total / item.reviews.length;
        }
      }

      return (
        <Col md={24} sm={8} xs={8} className="card-hover" key={item.id}>
          <Row>
            <Col span={24}>
              <div key={item.id} className="card">
                <Link
                  to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                    id: `${item.slug}.${item.id}`,
                  })}
                >
                  <div className="box-image">
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].name}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <div className="card-title">
                      <div className="name">{item.name}</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {item.hashtagOne && (
                          <div>
                            <Tag
                              style={{
                                color: "rgb(255, 0, 32)",
                                borderColor: "rgb(255, 0, 32)",
                                fontSize: "10px",
                              }}
                            >
                              <div style={{ lineHeight: "1.5" }}>
                                {item.hashtagOne}
                              </div>
                            </Tag>
                          </div>
                        )}
                        {item.hashtagTwo && (
                          <div>
                            <Tag
                              style={{
                                color: "#ee4d2d",
                                borderColor: "#ee4d2d",
                                fontSize: "10px",
                              }}
                            >
                              <div style={{ lineHeight: "1.5" }}>
                                {item.hashtagTwo}
                              </div>
                            </Tag>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="card-price">
                        <div>
                          <span style={{ fontSize: 12 }}>đ̲</span>
                          <span>{item.price.toLocaleString()}</span>
                        </div>
                        <div>
                          <img
                            style={{ width: 20 }}
                            src="data:image/png;base64,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"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="card-rate">
                        <div>
                          <Rate
                            allowHalf
                            disabled
                            style={{
                              fontSize: 10,
                              marginBottom: 4,
                            }}
                            value={averageRateReview}
                          />
                        </div>
                        <div style={{ fontSize: 12, marginLeft: 6 }}>
                          Đã bán 86,6k
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
            <Col span={24}>
              <div
                className="similar"
                // onClick={() => handleFilter("categoryId", [item.categoryId])}
                onClick={() =>
                  navigate(ROUTES.USER.PRODUCT_LIST, {
                    state: {
                      categoryId: [item.categoryId],
                    },
                  })
                }
              >
                Sản phẩm tương tự
              </div>
            </Col>
          </Row>
        </Col>
      );
    });
  };

  let averageRateReview = 0;
  if (reviewList.data.length !== 0) {
    let total = 0;
    for (let i = 0; i < reviewList.data.length; i++) {
      total = total + reviewList.data[i].rate;
      averageRateReview = total / reviewList.data.length;
    }
  }

  const existReview = userInfo.data.id
    ? reviewList.data.find((item) => item.userId === userInfo.data.id)
    : undefined;

  const initialValues = existReview
    ? {
        rate: existReview.rate,
        comment: existReview.comment,
      }
    : {
        rate: 0,
        comment: "",
      };

  const hasOptions = !!productDetail.data.options?.length;
  const selectedOptionData = productDetail.data.options?.find(
    (item) => item.id === selectedOptionId
  );
  const bonusPrice = selectedOptionData ? selectedOptionData.bonusPrice : 0;
  const productPrice = (productDetail.data.price || 0) + bonusPrice;

  const isLike = userInfo.data.id
    ? productDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, [productId]);

  useEffect(() => {
    dispatch(getReviewListAction({ productId: productId }));
  }, []);

  useEffect(() => {
    if (hasOptions) {
      setSelectedOptionId(productDetail.data.options[0].id);
    }
  }, [productDetail.data, hasOptions]);

  useEffect(() => {
    if (existReview?.id) {
      reviewForm.resetFields();
    }
  }, [existReview]);

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        ...(selectedOptionData && {
          optionId: selectedOptionData.id,
          optionName: selectedOptionData.name,
        }),
        productId: productId,
        name: productDetail.data.name,
        quantity: productQuantity,
        price: productPrice,
        slug: productDetail.data.slug,
        images: productDetail.data.images,
      })
    );
  };

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoriteProductAction({
              id: favoriteData.id,
              productId: productDetail.data.id,
            })
          );
        }
      } else {
        dispatch(
          favoriteProductAction({
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  const handleReview = (values) => {
    const reviewIndex = reviewList.data.findIndex(
      (item, index) =>
        item.productId === productId && item.userId === userInfo.data.id
    );

    if (reviewIndex === -1) {
      dispatch(
        postReviewAction({
          ...values,
          userId: userInfo.data.id,
          productId: productId,
          callback: {
            setIsShowFormReview: () => setIsShowFormReview(!isShowFormReview),
          },
        })
      );
    } else {
      dispatch(
        patchReviewAction({
          ...values,
          id: reviewList.data[reviewIndex].id,
          productId: productId,
          callback: {
            resetReviewForm: reviewForm.resetFields(),
            setIsShowFormReview: () => setIsShowFormReview(!isShowFormReview),
          },
        })
      );
    }
  };

  const renderProductOptions = useMemo(() => {
    if (!productDetail.data.options?.length) return null;
    return productDetail.data.options?.map((item, index) => {
      return (
        <Radio
          style={{
            width: "70px",
            height: "34px",
            textAlign: "center",
            marginRight: 10,
          }}
          key={item.id}
          value={item.id}
        >
          {item.name}
        </Radio>
      );
    });
  }, [productDetail.data]);

  const renderProductImages = useMemo(() => {
    if (!productDetail.data.images?.length) return null;
    return productDetail.data.images?.map((item, index) => {
      return (
        <img
          key={index}
          src={item.url}
          alt={item.name}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            padding: 5,
            marginRight: 10,
            border: "2px solid #ee4d2d",
          }}
        ></img>
      );
    });
  }, [productDetail.data]);

  const renderProductImageFirst = useMemo(() => {
    if (!productDetail.data.images?.length) return null;
    return (
      <img
        src={productDetail.data.images[0].url}
        alt={productDetail.data.images[0].name}
        style={{
          width: "100%",
          height: "560px",
          objectFit: "cover",
          marginBottom: 16,
        }}
      />
    );
  }, [productDetail.data]);

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data.map((item) => {
      return (
        <div
          key={item.id}
          style={{
            paddingBottom: "16px",
            borderBottom: "1px solid rgb(204, 204, 204)",
            marginTop: "12px",
          }}
        >
          <Space>
            <h4>{item.user?.fullName}</h4>
            <span style={{ fontSize: 11, color: "#797979" }}>
              {moment(item.createdAt).fromNow()}
            </span>
          </Space>
          <div style={{ marginTop: "3px" }}>
            <Rate
              style={{ color: "#d0011b" }}
              allowHalf
              value={item.rate}
              disabled
            />
          </div>
          <div style={{ marginTop: "5px" }}>{item.comment}</div>
        </div>
      );
    });
  }, [reviewList.data]);

  return (
    <S.MainContainer>
      <S.MainContent>
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTES.USER.PRODUCT_LIST}>Sản phẩm</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={ROUTES.USER.PRODUCT_LIST}
              state={{ categoryId: [productDetail.data.categoryId] }}
            >
              {productDetail.data.category?.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productDetail.data.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="container-top">
          <Col sm={10} xs={24} className="card-left">
            <div className="product-image">
              {renderProductImageFirst}
              <div
                style={{
                  display: "flex",
                  width: "87px",
                  height: "87px",
                }}
              >
                {renderProductImages}
              </div>
            </div>
            <div className="card-media">
              <div className="share">
                <Space>
                  <div style={{ fontSize: "16px" }}>Chia sẻ</div>
                  <div style={{ width: "26px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png"
                      alt=""
                    />
                  </div>
                  <div style={{ width: "26px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
                      alt=""
                    />
                  </div>
                  <div style={{ width: "26px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                      alt=""
                    />
                  </div>
                  <div style={{ width: "26px" }}>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src="https://seeklogo.com/images/T/tiktok-logo-1F4A5DCD45-seeklogo.com.png"
                      alt=""
                    />
                  </div>
                </Space>
              </div>
              <div className="liked">
                <Button
                  size="medium"
                  danger={isLike}
                  ghost={isLike}
                  icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => handleToggleFavorite()}
                >
                  Đã thích ({productDetail.data?.favorites?.length || 0})
                </Button>
              </div>
            </div>
          </Col>

          <Col sm={14} xs={24} className="card-right">
            <div className="product-info">
              <h3>{productDetail.data.name}</h3>

              <Space className="product-rate">
                <h3 style={{ color: "#d0011b" }}>{averageRateReview}</h3>
                <Rate
                  style={{ color: "#d0011b", paddingRight: "16px" }}
                  allowHalf
                  value={averageRateReview}
                  disabled
                />

                <div
                  style={{ borderLeft: "1px solid black", padding: "0px 16px" }}
                >
                  <span
                    style={{ color: "#d0011b", marginRight: 8, fontSize: 16 }}
                  >
                    {reviewList.data.length}
                  </span>
                  <span style={{ color: "#636363", fontSize: 14 }}>
                    Đánh giá
                  </span>
                </div>

                <div
                  style={{ borderLeft: "1px solid black", padding: "0px 16px" }}
                >
                  <span
                    style={{ color: "#d0011b", marginRight: 8, fontSize: 16 }}
                  >
                    {orderProductSold.data.length}
                  </span>
                  <span style={{ color: "#636363", fontSize: 14 }}>Đã bán</span>
                </div>
              </Space>

              <div className="product-price">
                <h1 style={{ color: "#ee4d2d", fontWeight: 400 }}>
                  {productPrice?.toLocaleString()} đ
                </h1>
              </div>

              <div className="product-info-options">
                <div>
                  <div className="option-title">Mã Giảm Giá</div>
                  <div>{renderVoucher}</div>
                </div>

                <div>
                  <div className="option-title">
                    <div>Giảm phí vận chuyển</div>
                  </div>
                  <div>{renderVoucherShip}</div>
                </div>

                <div>
                  <div className="option-title">Vận Chuyển Từ</div>
                  <div>Đà Nẵng</div>
                </div>

                <div>
                  <div className="option-title">Size</div>
                  {hasOptions && (
                    <Radio.Group
                      optionType="button"
                      buttonStyle="solid"
                      onChange={(e) => setSelectedOptionId(e.target.value)}
                      value={selectedOptionId}
                    >
                      {renderProductOptions}
                    </Radio.Group>
                  )}
                </div>

                <div>
                  <div className="option-title">Số lượng</div>
                  <div>
                    <InputNumber
                      min={1}
                      value={productQuantity}
                      onChange={(values) => setProductQuantity(values)}
                    />
                  </div>
                </div>
              </div>
              <Col sm={8} xs={24}>
                <Button
                  style={{ width: "100%", height: 40, marginTop: 24 }}
                  className="button-submit"
                  type="danger"
                  onClick={() => handleAddToCart()}
                >
                  Thêm vào giỏ
                </Button>
              </Col>
            </div>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col md={18} sm={24} xs={24}>
            <div style={{ backgroundColor: "white", margin: "16px 0px" }}>
              <S.Wraper
                dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
              />
            </div>
          </Col>
          <Col md={6} sm={24} sx={24} style={{ marginBottom: 16 }}>
            <Row className="cards" gutter={[12, 12]}>
              {renderProductList()}
            </Row>
          </Col>
        </Row>

        <Row>
          <Col sm={18} xs={24}>
            <Card size="small" bordered={false} title={<h3>Đánh giá</h3>}>
              {userInfo.data.id &&
                (existReview?.id ? (
                  isShowFormReview ? (
                    <Form
                      name="reviewForm"
                      form={reviewForm}
                      layout="vertical"
                      initialValues={initialValues}
                      style={{
                        paddingBottom: 16,
                        marginBottom: 16,
                        borderBottom: "1px solid #ccc",
                      }}
                      onFinish={(values) => handleReview(values)}
                    >
                      <Form.Item name="rate">
                        <Rate style={{ color: "#d0011b" }} allowHalf />
                      </Form.Item>
                      <Form.Item label="Nội dung" name="comment">
                        <Input.TextArea autoSize={{ maxRows: 6, minRows: 2 }} />
                      </Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          Đánh giá
                        </Button>
                        <Button
                          ghost
                          type="danger"
                          onClick={() => setIsShowFormReview(!isShowFormReview)}
                        >
                          Hủy
                        </Button>
                      </Space>
                    </Form>
                  ) : (
                    <div
                      style={{
                        paddingBottom: "16px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <div style={{ fontWeight: 500, fontSize: "14" }}>
                        Cảm ơn bạn đã đánh giá sản phẩm
                      </div>
                      <div
                        className="btn-edit-review"
                        onClick={() => setIsShowFormReview(!isShowFormReview)}
                      >
                        Chỉnh sửa
                      </div>
                    </div>
                  )
                ) : (
                  <Form
                    name="reviewForm"
                    form={reviewForm}
                    layout="vertical"
                    initialValues={initialValues}
                    style={{
                      paddingBottom: 16,
                      marginBottom: 16,
                      borderBottom: "1px solid #ccc",
                    }}
                    onFinish={(values) => handleReview(values)}
                  >
                    <Form.Item name="rate">
                      <Rate allowHalf style={{ color: "#d0011b" }} />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="comment">
                      <Input.TextArea autoSize={{ maxRows: 6, minRows: 2 }} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Đánh giá
                    </Button>
                  </Form>
                ))}
              {renderReviewList}
            </Card>
          </Col>
        </Row>
      </S.MainContent>
    </S.MainContainer>
  );
};

export default ProductDetailPage;

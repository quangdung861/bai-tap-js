import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, generatePath, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Checkbox,
  Space,
  Input,
  Select,
  Tag,
  Rate,
} from "antd";

import {
  getProductListAction,
  clearProductListAction,
  getCategoryListAction,
} from "../../../../redux/user/actions";
import moment from "moment";
import { PRODUCT_LIST_LIMIT } from "../../../../constants/pagination";
import { ROUTES } from "../../../../constants/routes";

import * as S from "./styles";
const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: "",
    price: [0, 10000000],
  });
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [priceFilter, setPriceFilter] = useState("");

  const { productList } = useSelector((state) => state.productReducer);

  const { categoryList } = useSelector((state) => state.categoryReducer);

  const newDate = moment(1667820910668).fromNow();

  ///

  const handlePriceFilter = (key, value) => {
    console.log("🚀 ~ file: index.jsx:47 ~ handlePriceFilter ~ key, value", key, value)
    if (priceFilter === value) {
      setPriceFilter("");
      handleFilter(key, "");
    } else {
      setPriceFilter(value);
      handleFilter(key, value);
    }
  };

  useEffect(() => {
    if (state?.categoryId?.length) {
      dispatch(
        getProductListAction({
          params: {
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
            categoryId: state.categoryId,
          },
        })
      );
      setFilterParams({ ...filterParams, categoryId: state.categoryId });
    } else {
      dispatch(
        getProductListAction({
          params: {
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
          },
        })
      );
    }
    dispatch(getCategoryListAction());
  }, [state]);

  ////

  useEffect(() => {
    return () => dispatch(clearProductListAction());
  }, []);

  const handleFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      [key]: value,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          [key]: value,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
  };

  // const handleFiltercategory = (value) => {
  //   setFilterParams({
  //     ...filterParams,
  //     categoryId: value,
  //   });
  //   dispatch(
  //     getProductListAction({
  //       params: {
  //         ...filterParams,
  //         categoryId: value,
  //         page: 1,
  //         limit: PRODUCT_LIST_LIMIT,
  //       },
  //     })
  //   );
  // };
  // const handleFilterKeyword = (value) => {
  //   setFilterParams({
  //     ...filterParams,
  //     keyword: value,
  //   });
  //   dispatch(
  //     getProductListAction({
  //       params: {
  //         ...filterParams,
  //         keyword: value,
  //         page: 1,
  //         limit: PRODUCT_LIST_LIMIT,
  //       },
  //     })
  //   );
  // };

  const handleClearCategoryFilter = (id) => {
    const newCategoryId = filterParams.categoryId.filter((item) => item !== id);
    setFilterParams({
      ...filterParams,
      categoryId: newCategoryId,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          categoryId: newCategoryId,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
  };

  const handleClearKeyword = () => {
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          keyword: "",
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          page: productList.meta.page + 1,
          limit: PRODUCT_LIST_LIMIT,
        },
        showMore: true,
      })
    );
  };

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
        <Col lg={6} md={8} sm={12} xs={12} className="card-hover" key={item.id}>
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <span
                              style={{
                                ...(item.discountPrice && {
                                  color: "#a09e9e",
                                  textDecoration: "line-through",
                                  fontSize: 10,
                                }),
                              }}
                            >
                              đ̲
                            </span>
                            <span
                              style={{
                                ...(item.discountPrice && {
                                  color: "#a09e9e",
                                  textDecoration: "line-through",
                                  fontSize: 14,
                                }),
                              }}
                            >
                              {item.price.toLocaleString()}
                            </span>
                          </div>
                          {item.discountPrice && (
                            <div style={{ marginLeft: 8 }}>
                              <span style={{ fontSize: 12 }}>đ̲</span>
                              <span>
                                {item.discountPrice?.toLocaleString()}
                              </span>
                            </div>
                          )}
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
                onClick={() => handleFilter("categoryId", [item.categoryId])}
              >
                Sản phẩm tương tự
              </div>
            </Col>
          </Row>
        </Col>
      );
    });
  };

  const renderCategoryOptions = () => {
    return categoryList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id} className="checkbox-option">
          {item.name}
        </Checkbox>
      );
    });
  };

  const renderFilterCategory = () => {
    return filterParams.categoryId.map((filterItem) => {
      const categoryData = categoryList.data.find(
        (categoryItem) => categoryItem.id === filterItem
      );
      if (!categoryData) return null;
      return (
        <Tag
          key={filterItem}
          color="gold"
          closable
          onClose={() => handleClearCategoryFilter(filterItem)}
        >
          {categoryData.name}
        </Tag>
      );
    });
  };

  return (
    <S.Wrapper>
      <Row gutter={24}>
        <Col md={5} sm={24} xs={24}>
          <div className="card-filter">
            <h3 style={{ marginBottom: 12 }}>Loại sản phẩm</h3>
            <Checkbox.Group
              onChange={(value) => handleFilter("categoryId", value)}
              value={filterParams.categoryId}
            >
              <Space direction="vertical">{renderCategoryOptions()}</Space>
            </Checkbox.Group>
          </div>
        </Col>
        <Col md={19} sm={24} xs={24}>
          <S.MainContent>
            <Row gutter={8} style={{ marginBottom: "10px" }}>
              <Col lg={16} md={14} sm={12} xs={10}>
                <Input
                  onChange={(e) => handleFilter("keyword", e.target.value)}
                  placeholder="Tìm kiếm"
                  value={filterParams.keyword}
                />
              </Col>
              <Col lg={4} md={5} sm={6} xs={7} >
                <Button
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    ...(priceFilter === "desc" && { color: "#999c03", border: "1px solid #999c03" }),
                  }}
                  onClick={() => handlePriceFilter("priceFilter", "desc")}
                >
                  Giá giảm dần
                </Button>
              </Col>
              <Col lg={4} md={5} sm={6} xs={7}>
                <Button
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    ...(priceFilter === "asc" && { color: "#999c03", border: "1px solid #999c03"}),
                  }}
                  onClick={() => handlePriceFilter("priceFilter", "asc")}
                >
                  Giá tăng dần
                </Button>
              </Col>
            </Row>
            <Space style={{ marginBottom: "10px" }}>
              {renderFilterCategory()}
              {filterParams.keyword && (
                <Tag
                  key="keyword"
                  closable
                  onClose={() => handleClearKeyword()}
                >
                  Keyword: {filterParams.keyword}
                </Tag>
              )}
            </Space>
            <Row
              style={{
                fontWeight: 500,
                marginBottom: "16px",
              }}
            >
              <Col md={24}>Có {productList.meta.total} sản phẩm</Col>
            </Row>
            <Row className="cards" gutter={[12, 12]}>
              {renderProductList()}
            </Row>
            {productList.meta.total !== productList.data.length && (
              <Row justify="center" style={{ marginTop: 32 }}>
                <Button
                  loading={productList.loading}
                  onClick={() => handleShowMore()}
                >
                  Xem thêm
                </Button>
              </Row>
            )}
          </S.MainContent>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default ProductListPage;

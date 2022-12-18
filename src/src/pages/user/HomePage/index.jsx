import React from "react";

import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import CarouselUser from "../../../layouts/user/CarouselUser";
import { generatePath } from "react-router-dom";

import { Row, Col, Button } from "antd";

import * as S from "./styles";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <S.MainContainer>

 

      <S.NavSidebar className="site-sidebar">
        <div className="dropdown-category">
          <ul className="menu-category-list">
            <li className="nav-item">
              <S.CustomLink
                className="customLink"
                to={ROUTES.USER.PRODUCT_LIST}
              >
                HÀNG MỚI VỀ
              </S.CustomLink>
            </li>
            <li className="nav-item">
              <S.CustomLink
                className="customLink"
                state={{
                  categoryId: [6],
                }}
                to={ROUTES.USER.PRODUCT_LIST}
              >
                ÁO SƠMI
              </S.CustomLink>
            </li>
            <li className="nav-item">
              <S.CustomLink
                className="customLink"
                state={{
                  categoryId: [4],
                }}
                to={ROUTES.USER.PRODUCT_LIST}
              >
                QUẦN JEAN
              </S.CustomLink>
            </li>
            <li className="nav-item">
              <S.CustomLink
                className="customLink"
                state={{
                  categoryId: [3],
                }}
                to={ROUTES.USER.PRODUCT_LIST}
              >
                ÁO KHOÁC
              </S.CustomLink>
            </li>
            <li className="nav-item">
              <S.CustomLink
                className="customLink"
                state={{
                  categoryId: [1],
                }}
                to={ROUTES.USER.PRODUCT_LIST}
              >
                ÁO POLO
              </S.CustomLink>
            </li>
            <li className="nav-item">
              <S.CustomLink
                className="customLink"
                state={{
                  categoryId: [5],
                }}
                to={ROUTES.USER.PRODUCT_LIST}
              >
                QUẦN NGẮN
              </S.CustomLink>
            </li>
          </ul>
        </div>
      </S.NavSidebar>
      <CarouselUser />

      <S.Wrapper>
        <Row gutter={[12, 12]}>
          <Col md={12} sm={24} sx={24}>
            <div
              className="container"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: {
                    categoryId: [7],
                  },
                })
              }
            >
              <img
                className="image"
                style={{ width: "100%" }}
                src="https://theme.hstatic.net/1000333436/1000835503/14/hc_img_1_1024x1024.png?v=473"
                alt=""
              />
              <div className="overlay"></div>
              <div className="collection-info">
                <S.CustomButton className="customButton">
                  Xem thêm
                </S.CustomButton>
              </div>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <Row gutter={12}>
              <Col span={12}>
                <div
                  className="container"
                  onClick={() =>
                    navigate(ROUTES.USER.PRODUCT_LIST, {
                      state: {
                        categoryId: [3],
                      },
                    })
                  }
                >
                  <img
                    className="image"
                    style={{ width: "100%" }}
                    src="https://theme.hstatic.net/1000333436/1000835503/14/hc_img_2_large.png?v=473"
                    alt=""
                  />
                  <div className="overlay"></div>
                  <div className="collection-info">
                    <S.CustomButton className="customButton">
                      Xem thêm
                    </S.CustomButton>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div
                  className="container"
                  onClick={() =>
                    navigate(ROUTES.USER.PRODUCT_LIST, {
                      state: {
                        categoryId: [9],
                      },
                    })
                  }
                >
                  <img
                    className="image"
                    style={{ width: "100%" }}
                    src="https://theme.hstatic.net/1000333436/1000835503/14/hc_img_3_large.png?v=473"
                    alt=""
                  />
                  <div className="overlay"></div>
                  <div className="collection-info">
                    <S.CustomButton className="customButton">
                      Xem thêm
                    </S.CustomButton>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div
                  className="container"
                  style={{ marginTop: "9px" }}
                  onClick={() =>
                    navigate(ROUTES.USER.PRODUCT_LIST, {
                      state: {
                        categoryId: [10],
                      },
                    })
                  }
                >
                  <img
                    className="image"
                    style={{ width: "100%" }}
                    src="https://theme.hstatic.net/1000333436/1000835503/14/hc_img_4_large.png?v=473"
                    alt=""
                  />
                  <div className="overlay"></div>
                  <div className="collection-info">
                    <S.CustomButton className="customButton">
                      Xem thêm
                    </S.CustomButton>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ margin: "30px 0px", textAlign: "center" }}>
              <h2>BST SUIT MỚI</h2>
            </div>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col md={6} sm={12} xs={12}>
            <div
              className="box-image"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: {
                    categoryId: [7],
                  },
                })
              }
            >
              <img
                className="card-image"
                src="https://theme.hstatic.net/1000333436/1000835503/14/hnc1_img_1_grande.jpg?v=473"
                alt=""
              />
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="box-image"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: {
                    categoryId: [7],
                  },
                })
              }
            >
              <img
                className="card-image"
                src="https://theme.hstatic.net/1000333436/1000835503/14/hnc1_img_2_grande.jpg?v=473"
                alt=""
              />
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="box-image"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: {
                    categoryId: [7],
                  },
                })
              }
            >
              <img
                className="card-image"
                src="https://theme.hstatic.net/1000333436/1000835503/14/hnc1_img_3_grande.jpg?v=473"
                alt=""
              />
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="box-image"
              onClick={() =>
                navigate(ROUTES.USER.PRODUCT_LIST, {
                  state: {
                    categoryId: [7],
                  },
                })
              }
            >
              <img
                className="card-image"
                src="https://theme.hstatic.net/1000333436/1000835503/14/hnc1_img_4_grande.jpg?v=473"
                alt=""
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ margin: "30px 0px", textAlign: "center" }}>
              <h2>DE VINC STORE</h2>
            </div>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col md={24} sm={24} xs={24}>
            <div>
              <iframe
                width="100%"
                height="660"
                src="https://www.youtube.com/embed/jvN0fOgjzIc"
                title="ADAM STORE WINTER COLLECTION 2022"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Col>
        </Row>
      </S.Wrapper>
    </S.MainContainer>
    
  );
};

export default HomePage;

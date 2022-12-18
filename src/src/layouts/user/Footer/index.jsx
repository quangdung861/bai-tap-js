import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import * as S from "./styles";

const Footer = () => {
  return (
    <>
      <S.Wrapper>
        <Row>
          <Col span={24}>
            <div
              style={{ borderTop: "1px solid #000", marginBottom: 24 }}
            ></div>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Col md={4} sm={12} xs={12}>
            <h4 style={{ marginBottom: "4px", fontWeight: 600 }}>
              HƯỚNG DẪN MUA HÀNG
            </h4>
            <div>
              <S.CustomLink className="custom-link">Cách mua hàng</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">
                Thông tin chung
              </S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">Thanh toán</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">Giao hàng</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">
                Đổi trả lại hàng hóa
              </S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">
                Các mặt hàng được thu hồi
              </S.CustomLink>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <h4 style={{ marginBottom: "4px", fontWeight: 600 }}>
              THEO DÕI CHÚNG TÔI
            </h4>
            <div>
              <S.CustomLink className="custom-link">Bản tin</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">Facebook</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">Instagram</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">Youtube</S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">Tiktok</S.CustomLink>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <h4 style={{ marginBottom: "4px", fontWeight: 600 }}>CHÍNH SÁCH</h4>
            <div>
              <S.CustomLink className="custom-link">
                Chính sách bảo mật
              </S.CustomLink>
            </div>
            <div>
              <S.CustomLink className="custom-link">
                Chính sách vận chuyển
              </S.CustomLink>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <div>
              <h4 style={{ marginBottom: "4px", fontWeight: 600 }}>CÔNG TY</h4>
              <div>
                <S.CustomLink className="custom-link">
                  Giới thiệu về chúng tôi
                </S.CustomLink>
              </div>
              <div>
                <S.CustomLink className="custom-link">Cửa hàng</S.CustomLink>
              </div>
              <div>
                <S.CustomLink className="custom-link">Liên hệ</S.CustomLink>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              style={{ borderTop: "1px solid #000", margin: "24px 0px" }}
            ></div>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col md={12} sm={14} xs={16}>
            <div>
              <p>DE VINC., LTD</p>
              <p>
                399 Quang Trung, Phường 10, Quận Gò Vấp, Thành phố Hồ Chí Minh,
                Việt Nam
              </p>
              <p>Tel: 028.71079997, MST: 0314533055</p>
            </div>
          </Col>
          <Col md={12} sm={10} xs={8}>
            <div
              className="right"
              style={{ textAlign: "right", width: "100%" }}
            >
              <img
                src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
                alt=""
                style={{ width: "30%" }}
              />
            </div>
          </Col>
        </Row>
      </S.Wrapper>
    </>
  );
};

export default Footer;

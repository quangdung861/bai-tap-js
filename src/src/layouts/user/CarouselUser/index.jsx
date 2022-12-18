import { Carousel } from "antd";
import React from "react";
// const contentStyle = {
//   width: "100%",
//   height: '100%',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };
import * as S from "./styles";

const CarouselUser = () => {
  return (
    <S.Wrapper>
      <Carousel autoplay>
        <S.BoxImage>
          <img
            src="https://theme.hstatic.net/1000333436/1000835503/14/slideshow_1_master.jpg?v=473"
            alt=""
          />
        </S.BoxImage>
        <S.BoxImage>
          <img
            src="https://theme.hstatic.net/1000333436/1000835503/14/slideshow_2_master.jpg?v=473"
            alt=""
          />
        </S.BoxImage>
      </Carousel>
    </S.Wrapper>
  );
};

export default CarouselUser;

import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  padding: 30px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 80vh;

  & .stepper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  & .stepper__line {
    position: absolute;
    top: 33px;
    height: 4px;
    margin-left: 30px;
    width: 100%;
    transition: all 0.5s ease;
  }

  & .step__default {
    background: rgb(224, 224, 224);
    width: calc((100% - 160px) * 1);
  }

  & .stepper__step--icon {
    color: rgb(224, 224, 224);
    border: 4px solid rgb(224, 224, 224);
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
    z-index: 2;
    transition: all 0.5s ease;
  }

  & .stepper__step--text {
    margin: 20px 0px 4px 0px;
  }

  & .stepper__step--date {
    font-size: 12px;
    color: #ccc;
  }

  & .stepper__step--finish {
    background-color: white;
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: 3s;
  }

  & .line__box {
    height: 0.1875rem;
    width: 100%;
    background-position-x: -1.875rem;
    background-size: 7.25rem 0.1875rem;
    background-image: repeating-linear-gradient(
      45deg,
      #6fa6d6,
      #6fa6d6 33px,
      transparent 0,
      transparent 41px,
      #f18d9b 0,
      #f18d9b 74px,
      transparent 0,
      transparent 82px
    );
  }

  & .content-right {
    border-left: 1px solid #ccc;
  }

  & .btn-submit {
    height: 40px;
    width: 80px;
  }

  @media only screen and (max-width: 576px) {
    & .content-right {
      border-left: none;
    }
    & .sidebar {
      margin-top: 50px;
    }
  }

  & .stepper__line .step__overwrite {
    z-index: 1;
  }

  ${({ activeLineFinish }) =>
    activeLineFinish === "CHỜ XÁC NHẬN"
      ? css`
          & .stepper__line .step__overwrite {
            color: rgb(45, 194, 88);
            background: rgb(45, 194, 88);
            width: calc((100% - 160px) * 0.25);
          }
          & .icon__1 {
            color: rgb(45, 194, 88);
            border: 4px solid rgb(45, 194, 88);
          }
          & .icon__2 {
            color: white;
            border: 4px solid rgb(45, 194, 88);
            background: rgb(45, 194, 88);
          }
        `
      : activeLineFinish === "CHỜ LẤY HÀNG"
      ? css`
          & .stepper__line .step__overwrite {
            color: rgb(45, 194, 88);
            background: rgb(45, 194, 88);
            width: calc((100% - 160px) * 0.5);
          }
          & .icon__1,
          .icon__2 {
            color: rgb(45, 194, 88);
            border: 4px solid rgb(45, 194, 88);
          }
          & .icon__3 {
            color: white;
            border: 4px solid rgb(45, 194, 88);
            background: rgb(45, 194, 88);
          }
        `
      : activeLineFinish === "ĐANG GIAO"
      ? css`
          & .stepper__line .step__overwrite {
            color: rgb(45, 194, 88);
            background: rgb(45, 194, 88);
            width: calc((100% - 160px) * 0.75);
          }
          & .icon__1,
          .icon__2,
          .icon__3 {
            color: rgb(45, 194, 88);
            border: 4px solid rgb(45, 194, 88);
          }
          & .icon__4 {
            color: white;
            border: 4px solid rgb(45, 194, 88);
            background: rgb(45, 194, 88);
          }
        `
      : activeLineFinish === "ĐÃ GIAO"
      ? css`
          & .stepper__line .step__overwrite {
            color: rgb(45, 194, 88);
            background: rgb(45, 194, 88);
            width: calc((100% - 160px) * 1);
          }
          & .icon__1,
          .icon__2,
          .icon__3,
          .icon__4 {
            color: rgb(45, 194, 88);
            border: 4px solid rgb(45, 194, 88);
          }
          & .icon__5 {
            color: white;
            border: 4px solid rgb(45, 194, 88);
            background: rgb(45, 194, 88);
          }
        `
      : activeLineFinish === 6 &&
        css`
          & .stepper__line .step__overwrite {
            color: rgb(45, 194, 88);
            background: rgb(45, 194, 88);
            width: calc((100% - 160px) * 1);
          }
          & .icon__1,
          .icon__2,
          .icon__3,
          .icon__4,
          .icon__5 {
            color: rgb(45, 194, 88);
            border: 4px solid rgb(45, 194, 88);
          }
        `}
`;

import styled, { css } from "styled-components";
import { Row, Radio } from "antd";

export const Wrapper = styled.div`
  padding: 16px 0px;
  width: 100%;
  max-width:1200px ;
  margin: 0 auto;


  @media only screen and (max-width: 576px) {
    & .title {
      margin-top: 32px;
    }
  }
`;

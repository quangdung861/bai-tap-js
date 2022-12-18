import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  padding: 16px;

  & .custom-link:hover {
    color: #999c03;
  }
`;

export const CustomLink = styled(Link)`
  color: black;
  font-size: 16px;
  font-weight: 500;

  ${(props) =>
    props.active === "true" &&
    css`
      color: #999c03;
    `}
`;

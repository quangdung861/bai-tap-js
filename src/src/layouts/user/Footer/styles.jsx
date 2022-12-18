import styled from "styled-components";
import { Link } from "react-router-dom"

export const Wrapper = styled.div`
  padding: 30px 0px 12px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  & .custom-link:hover {
    color: #999c03;
  }
`;

export const CustomLink = styled(Link)`
  color: black;

`

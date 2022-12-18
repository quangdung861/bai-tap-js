import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 30px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 80vh;

  @media only screen and (max-width: 576px) {
    & .sidebar {
      margin-top: 40px;
      padding-bottom: 0px;
    }
  }
`;

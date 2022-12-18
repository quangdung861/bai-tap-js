import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 30px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 80vh;

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
`;

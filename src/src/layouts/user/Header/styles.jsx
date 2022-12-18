import styled from "styled-components";

export const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media only screen and (max-width: 576px) {
    & .header-content {
      display: none;
    }
    & .header-content-mobile {
      display: block;
    }
  }
`;

export const HeaderContentMobile = styled.div`
  display: none;
  z-index: 10;
  position: absolute;
  position: fixed;
  padding: 16px;
  width: 100%;
  overflow: auto;
  background-color: white;
  & .content-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 20px 16px;
  & .logo-header span {
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
  }

  & .list-action {
    list-style: none;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    li {
      margin-left: 16px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  & .list-action li:hover {
    color: #999c03;
  }
`;

import styled from "styled-components";

export const mainContainer = styled.div`
  padding: 0px 32px;
  background-color: white;
`;
export const mainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .breadcrumb {
    font-size: 24px;
    font-weight: 400;
  }

  & .list-action {
    display: flex;
    align-items: center;
  }

  & .list-action > div {
    padding: 16px 13px;
    color: #95989b;
  }

  & .list-action > div:hover {
    background-color: #f2f9ff;
    color: #1b92ff;
    cursor: pointer;
  }

  & .list-action .account {
    color: black;
  }
  & .label-item-menu {
    color: #95989b;
  }
`;

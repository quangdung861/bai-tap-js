import styled from "styled-components";

export const MainContainer = styled.div`
  & .header {
    padding: 8px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
  & .header .page-back {
    font-weight: 500;
    color: #95989b;
  }
  & .span-button {
    font-weight: 500;
  }
`;

export const MainContent = styled.div`
  padding: 24px 12px;
  width: 100%;
  max-width: 1410px;
  margin: 0 auto;

  & .card-list {
    display: flex;
  }

  & .card-list Input {
    height: 40px;
  }
  & .card-list-left {
    width: 67%;
  }

  & .card-list-right {
    width: 33%;
    padding-left: 24px;
  }

  & .card-item {
    margin-bottom: 24px;
  }

  & .box-status {
    background-color: white;
    padding: 16px 24px 0px 24px;
  }

  & .box-hashtag {
    background-color: white;
    padding: 16px 24px 16px 24px;
    margin-bottom: 16px;
  }
`;

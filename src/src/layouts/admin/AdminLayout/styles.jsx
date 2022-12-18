import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  height: 100%;
  background-color: #f0f1f1;
  position: relative;
  display: flex;
  flex: 1;
`;
export const MainContent = styled.div`
  margin-left: 50px;
  width: calc(100% - 50px);
  transition: all 0.3s;
  min-height: 100vh;
  height: 100%;
  ${(props) =>
    props.isShowSidebar &&
    css`
      margin-left: 230px;
      width: calc(100% - 230px);
    `}
`;

export const LoadingWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

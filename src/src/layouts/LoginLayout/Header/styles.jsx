import styled from "styled-components";

export const HeaderContainer = styled.div`
  margin: 0px 100px;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  & .logo-header {
    display: flex;
    align-items: center;
  }
  & .logo-header span {
    font-size: 24px;    
    cursor: pointer;
  }
`;
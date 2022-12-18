import styled from "styled-components";
import { Tabs } from "antd";

export const Wrapper = styled.div`
  padding: 30px 0px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  min-height: 80vh;
`;

export const CustomTabs = styled(Tabs)`
  & .ant-tabs-nav {
    background-color: white;
    margin-bottom: 0px;
  }
`;

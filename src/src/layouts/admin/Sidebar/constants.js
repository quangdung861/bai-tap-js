import { ROUTES } from "../../../constants/routes";
import { HomeOutlined, CodeSandboxOutlined, UserOutlined, SwapOutlined, ProfileOutlined } from "@ant-design/icons";

export const SIDEBAR_ITEMS = [
  {
    title: "Tổng quan",
    path: ROUTES.ADMIN.DASHBOARD,
    icon: <HomeOutlined className="icon" />,
  },
  {
    title: "Danh sách đơn hàng",
    path: ROUTES.ADMIN.ORDERS,
    icon: <ProfileOutlined  className="icon" />,
  },
  { 
    title: "Sản phẩm",
    path: ROUTES.ADMIN.PRODUCT_LIST ,
    icon: <CodeSandboxOutlined className="icon" />,
  },
  {
    title: "Khách hàng",
    path: ROUTES.ADMIN.CUSTOMER_LIST,
    icon: <UserOutlined className="icon" />,
  },
  {
    title: "Trang người dùng",
    path: ROUTES.USER.PRODUCT_LIST,
    icon: <SwapOutlined className="icon" />,
  },
];

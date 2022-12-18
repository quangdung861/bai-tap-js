export const ROUTES = {
  LOGIN: "/login",
  USER: {
    HOME: "/",
    PRODUCT_LIST: "/products",
    PRODUCT_DETAIL: "/products/:id",
    REGISTER: "/register",
    CART: "/checkout/cart",
    PAYMENT: "/checkout/payment",
    SUCCESS: "/checkout/success",
    PROFILE: "/user/account/profile",
    ADDRESS: "/user/account/address",
    PURCHASE: "/user/account/purchase",
    ORDER_DETAIL: "/user/account/purchase/order/:id",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    ORDERS: "/admin/orders",
    PRODUCT_LIST: "/admin/products",
    UPDATE_PRODUCT: "/admin/products/:id/update",
    CREATE_PRODUCT: "/admin/products/create",
    CUSTOMER_LIST: "/admin/customers",
  },
};

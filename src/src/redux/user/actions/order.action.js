import { createAction } from "@reduxjs/toolkit";

import { REQUEST, ORDER_ACTION } from "../constants";

export const orderProductAction = createAction(
  REQUEST(ORDER_ACTION.ORDER_PRODUCT)
);
export const guestOrderProductAction = createAction(
  REQUEST(ORDER_ACTION.GUEST_ORDER_PRODUCT)
);
export const getOrderListAction = createAction(
  REQUEST(ORDER_ACTION.GET_ORDER_LIST)
);
export const getOrderDetailAction = createAction(
  REQUEST(ORDER_ACTION.GET_ORDER_DETAIL)
);
export const getProductSoldAction = createAction(
  REQUEST(ORDER_ACTION.GET_PRODUCT_SOLD)
);

/// ADMIN
export const handleOrderItemAction = createAction(
  REQUEST(ORDER_ACTION.HANDLE_ORDER_ITEM)
);

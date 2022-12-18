import { createAction } from "@reduxjs/toolkit";

import { REQUEST, CART_ACTION } from "../constants";

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const updateCartItemAction = createAction(
  REQUEST(CART_ACTION.UPDATE_CART_ITEM)
);
export const deleteCartItemAction = createAction(
  REQUEST(CART_ACTION.DELETE_CART_ITEM)
);
export const clearCartListAction = createAction(
  REQUEST(CART_ACTION.CLEAR_CART_LIST)
);
// export const setCheckoutInfoAction = createAction(REQUEST(CART_ACTION.SET_CHECKOUT_INFO));
// export const setCheckoutPaymentAction = createAction(REQUEST(CART_ACTION.SET_CHECKOUT_PAYMENT));

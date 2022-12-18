import { createAction } from "@reduxjs/toolkit";

import { REQUEST, PRODUCT_ADMIN_ACTION } from "../constants";

export const createProductAction = createAction(
  REQUEST(PRODUCT_ADMIN_ACTION.CREATE_PRODUCT)
);
export const getProductListAction = createAction(
  REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_LIST)
);
export const getProductDetailAction = createAction(
  REQUEST(PRODUCT_ADMIN_ACTION.GET_PRODUCT_DETAIL)
)
export const clearProductDetailAction = createAction(
  REQUEST(PRODUCT_ADMIN_ACTION.CLEAR_PRODUCT_DETAIL)
)
export const deleteProductAction = createAction(
  REQUEST(PRODUCT_ADMIN_ACTION.DELETE_PRODUCT)
);
export const updateProductAction = createAction(
  REQUEST(PRODUCT_ADMIN_ACTION.UPDATE_PRODUCT)
);

import { createAction } from "@reduxjs/toolkit";

import { REQUEST, CUSTOMER_ACTION } from "../constants";

export const getCustomerListAction = createAction(
  REQUEST(CUSTOMER_ACTION.GET_CUSTOMER_LIST)
);
export const deleteCustomerAction= createAction(
  REQUEST(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM)
);

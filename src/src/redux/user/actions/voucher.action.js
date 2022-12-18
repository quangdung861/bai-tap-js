import { createAction } from "@reduxjs/toolkit";

import { REQUEST, VOUCHER_ACTION } from "../constants";

export const getVoucherListAction = createAction(
  REQUEST(VOUCHER_ACTION.GET_VOUCHER_LIST)
);
export const voucherSelectAction = createAction(
  REQUEST(VOUCHER_ACTION.VOUCHER_SELECT)
);
// SHIP
export const getVoucherShipListAction = createAction(
  REQUEST(VOUCHER_ACTION.GET_VOUCHER_SHIP_LIST)
);
export const voucherShipSelectAction = createAction(
  REQUEST(VOUCHER_ACTION.VOUCHER_SHIP_SELECT)
);
// CLEAR
export const clearVoucherSelectedAction = createAction(
  REQUEST(VOUCHER_ACTION.CLEAR_VOUCHER_SELECTED)
);
export const clearVoucherShipSelectedAction = createAction(
  REQUEST(VOUCHER_ACTION.CLEAR_VOUCHER_SHIP_SELECTED)
);



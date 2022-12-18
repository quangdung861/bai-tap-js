import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, VOUCHER_ACTION } from "../constants";

const initialState = {
  voucherList: {
    data: [],
    loading: false,
    errors: null,
  },
  voucherSelected: {},

  voucherShipList: {
    data: [],
    loading: false,
    errors: null,
  },
  voucherShipSelected: {},
};

const voucherReducer = createReducer(initialState, {
  [REQUEST(VOUCHER_ACTION.GET_VOUCHER_LIST)]: (state, action) => {
    return {
      ...state,
      voucherList: {
        ...state.voucherList,
        loading: true,
      },
    };
  },

  [SUCCESS(VOUCHER_ACTION.GET_VOUCHER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      voucherList: {
        ...state.voucherList,
        data,
        loading: false,
      },
    };
  },

  [FAIL(VOUCHER_ACTION.GET_VOUCHER_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      voucherList: {
        ...state.voucherList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(VOUCHER_ACTION.VOUCHER_SELECT)]: (state, action) => {
    const { voucherId } = action.payload;
    let newVoucherSelected = {}
    if (voucherId === state.voucherSelected.id) {
      newVoucherSelected = {};
    } else {
      newVoucherSelected = state.voucherList.data.find(
        (item) => item.id === voucherId
      );
    }
    return {
      ...state,
      voucherSelected: newVoucherSelected,
    };
  },

  [REQUEST(VOUCHER_ACTION.CLEAR_VOUCHER_SELECTED)]: (state, action) => {
    return {
      ...state,
      voucherSelected: {},
    };
  },

  // SHIP

  [REQUEST(VOUCHER_ACTION.GET_VOUCHER_SHIP_LIST)]: (state, action) => {
    return {
      ...state,
      voucherShipList: {
        ...state.voucherShipList,
        loading: true,
      },
    };
  },

  [SUCCESS(VOUCHER_ACTION.GET_VOUCHER_SHIP_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      voucherShipList: {
        ...state.voucherShipList,
        data,
        loading: false,
      },
    };
  },

  [FAIL(VOUCHER_ACTION.GET_VOUCHER_SHIP_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      voucherShipList: {
        ...state.voucherShipList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(VOUCHER_ACTION.VOUCHER_SHIP_SELECT)]: (state, action) => {
    const { voucherShipId } = action.payload;
    let newVoucherShipSelected = {}
    if (voucherShipId === state.voucherShipSelected.id) {
      newVoucherShipSelected = {};
    } else {
      newVoucherShipSelected = state.voucherShipList.data.find(
        (item) => item.id === voucherShipId
      );
    }
    return {
      ...state,
      voucherShipSelected: newVoucherShipSelected,
    };
  },

  
  [REQUEST(VOUCHER_ACTION.CLEAR_VOUCHER_SHIP_SELECTED)]: (state, action) => {
    return {
      ...state,
      voucherShipSelected: {},
    };
  },
});

export default voucherReducer;

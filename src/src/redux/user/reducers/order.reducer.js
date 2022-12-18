import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, ORDER_ACTION } from "../constants";

const initialState = {
  orderList: {
    data: [],
    loading: false,
    error: "",
  },
  orderDetail: {
    data: {},
    loading: false,
    error: "",
  },
  orderData: {
    data: [],
    loading: false,
    error: "",
  },
  confirmOrder: {
    loading: false,
    error: "",
  },
  orderProductSold: {
    data: [],
    loading: false,
    error: "",
  },
};

const orderReducer = createReducer(initialState, {
  [REQUEST(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: false,
        error: error,
      },
    };
  },

  ///

  [REQUEST(ORDER_ACTION.GET_ORDER_DETAIL)]: (state, action) => {
    return {
      ...state,
      orderDetail: {
        ...state.orderDetail,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderDetail: {
        ...state.orderDetail,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(ORDER_ACTION.GET_ORDER_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderDetail: {
        ...state.orderDetail,
        loading: false,
        error: error,
      },
    };
  },

  ///

  [REQUEST(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    return {
      ...state,
      orderData: {
        ...state.orderData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderData: {
        ...state.orderData,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderData: {
        ...state.orderData,
        loading: false,
        error: error,
      },
    };
  },

  // CONFIRM
  [REQUEST(ORDER_ACTION.CONFIRM_ORDER_ITEM)]: (state, action) => {
    return {
      ...state,
      confirmOrder: {
        ...state.confirmOrder,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ORDER_ACTION.CONFIRM_ORDER_ITEM)]: (state, action) => {
    return {
      ...state,
      confirmOrder: {
        ...state.confirmOrder,
        loading: false,
      },
    };
  },
  [FAIL(ORDER_ACTION.CONFIRM_ORDER_ITEM)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      confirmOrder: {
        ...state.confirmOrder,
        loading: false,
        error: error,
      },
    };
  },

  // PRODUCT_SOLD
  [REQUEST(ORDER_ACTION.GET_PRODUCT_SOLD)]: (state, action) => {
    return {
      ...state,
      orderProductSold: {
        ...state.orderProductSold,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_PRODUCT_SOLD)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderProductSold: {
        ...state.orderProductSold,
        data,
        loading: false,
      },
    };
  },
  [FAIL(ORDER_ACTION.GET_PRODUCT_SOLD)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderProductSold: {
        ...state.orderProductSold,
        loading: false,
        error: error,
      },
    };
  },
});

export default orderReducer;

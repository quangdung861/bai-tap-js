import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, CUSTOMER_ACTION } from "../constants";

const initialState = {
  customerList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
  deleteCustomerData: {
    loading: false,
    errors: null,
  }
};

const customerAdminReducer = createReducer(initialState, {
  [REQUEST(CUSTOMER_ACTION.GET_CUSTOMER_LIST)]: (state, action) => {
    return {
      ...state,
      customerList: {
        ...state.customerList,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(CUSTOMER_ACTION.GET_CUSTOMER_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      customerList: {
        ...state.customerList,
        loading: false,
        errors: null,
        data,
        meta,
      },
    };
  },

  [FAIL(CUSTOMER_ACTION.GET_CUSTOMER_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      customerList: {
        ...state.customerList,
        loading: false,
        errors,
      },
    };
  },


  
  [REQUEST(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM)]: (state, action) => {
    return {
      ...state,
      deleteCustomerData: {
        ...state.deleteCustomerData,
        loading: true,
      },
    };
  },

  [SUCCESS(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM)]: (state, action) => {
    return {
      ...state,
      deleteCustomerData: {
        ...state.deleteCustomerData,
        loading: false,
      },
    };
  },

  [FAIL(CUSTOMER_ACTION.DELETE_CUSTOMER_ITEM)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      deleteCustomerData: {
        ...state.deleteCustomerData,
        loading: false,
        errors,
      },
    };
  },
});

export default customerAdminReducer;

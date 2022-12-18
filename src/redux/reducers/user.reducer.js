import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, USER_ACTION } from "../constants";

const initialState = {
  customerList: {
    data: [],
    loading: true,
    errors: null,
  },
  createUser: {
    data: [],
    loading: true,
    errors: null,
  },
  deleteCustomer: {
    data: [],
    loading: true,
    errors: null,
  },
  updateCustomer: {
    data: [],
    loading: true,
    errors: null,
  },
};

const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.GET_CUSTOMER_LIST)]: (state, action) => {
    return {
      ...state,
      customerList: {
        ...state.customerList,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(USER_ACTION.GET_CUSTOMER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      customerList: {
        ...state.customerList,
        loading: false,
        errors: null,
        data,
      },
    };
  },

  [FAIL(USER_ACTION.GET_CUSTOMER_LIST)]: (state, action) => {
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

  // CREATE

  [REQUEST(USER_ACTION.CREATE_CUSTOMER)]: (state, action) => {
    return {
      ...state,
      createUser: {
        ...state.createUser,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(USER_ACTION.CREATE_CUSTOMER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      createUser: {
        ...state.createUser,
        loading: false,
        errors: null,
        data,
      },
    };
  },

  [FAIL(USER_ACTION.CREATE_CUSTOMER)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createUser: {
        ...state.createUser,
        loading: false,
        errors,
      },
    };
  },

  // DELETE
  [REQUEST(USER_ACTION.DELETE_CUSTOMER)]: (state, action) => {
    return {
      ...state,
      deleteCustomer: {
        ...state.deleteCustomer,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(USER_ACTION.DELETE_CUSTOMER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      deleteCustomer: {
        ...state.deleteCustomer,
        loading: false,
        errors: null,
        data,
      },
    };
  },

  [FAIL(USER_ACTION.DELETE_CUSTOMER)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      deleteCustomer: {
        ...state.deleteCustomer,
        loading: false,
        errors,
      },
    };
  },

  // UPDATE

  [REQUEST(USER_ACTION.UPDATE_CUSTOMER)]: (state, action) => {
    return {
      ...state,
      updateCustomer: {
        ...state.updateCustomer,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(USER_ACTION.UPDATE_CUSTOMER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      updateCustomer: {
        ...state.updateCustomer,
        loading: false,
        errors: null,
        data,
      },
    };
  },

  [FAIL(USER_ACTION.UPDATE_CUSTOMER)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      updateCustomer: {
        ...state.updateCustomer,
        loading: false,
        errors,
      },
    };
  },


});

export default userReducer;

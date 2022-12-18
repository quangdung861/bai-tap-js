import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, USER_ACTION } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    loading: true,
    errors: null,
  },
  loginData: {
    loading: false,
    errors: null,
  },
  registerData: {
    loading: false,
    errors: null,
  },
  logoutData: {
    loading: false,
    errors: null,
  },
};

const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        ...state.registerData,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(USER_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        ...state.registerData,
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(USER_ACTION.REGISTER)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      registerData: {
        ...state.registerData,
        loading: false,
        errors,
      },
    };
  },

  // LOGIN

  [REQUEST(USER_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      loginData: {
        ...state.loginData,
        loading: true,
        errors: null,
      },
    };
  },

  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data.user,
        loading: false,
        errors: null,
      },
      loginData: {
        ...state.loginData,
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(USER_ACTION.LOGIN)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      loginData: {
        ...state.loginData,
        loading: false,
        errors,
      },
    };
  },

  // GET USER_INFO

  [REQUEST(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },

  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        data,
      },
    };
  },

  [FAIL(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        errors,
      },
    };
  },

  // LOGOUT

  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: {},
        loading: true,
        errors: null,
      },
    };
  },
});

export default userReducer;

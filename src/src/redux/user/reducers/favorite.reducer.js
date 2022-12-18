import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, FAVORITE_ACTION } from "../constants";

const initialState = {
  favoriteList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
};

const favoriteReducer = createReducer(initialState, {
  // GET PRODUCT_LIST

  [REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: true,
      },
    };
  },

  [SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        data,
        loading: false,
      },
    };
  },

  [FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: false,
        errors,
      },
    };
  },
});

export default favoriteReducer;

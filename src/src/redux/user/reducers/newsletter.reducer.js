import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, NEWSLETTER_ACTION } from "../constants";

const initialState = {
  newsletterList: {
    data: [],
    loading: false,
    errors: null,
  },
};

const newsletterReducer = createReducer(initialState, {
  // GET PRODUCT_LIST

  [REQUEST(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST)]: (state, action) => {
    return {
      ...state,
      newsletterList: {
        ...state.newsletterList,
        loading: true,
      },
    };
  },

  [SUCCESS(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      newsletterList: {
        ...state.newsletterList,
        data,
        loading: false,
      },
    };
  },

  [FAIL(NEWSLETTER_ACTION.GET_NEWSLETTER_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      newsletterList: {
        ...state.newsletterList,
        loading: false,
        errors,
      },
    };
  },
});

export default newsletterReducer;

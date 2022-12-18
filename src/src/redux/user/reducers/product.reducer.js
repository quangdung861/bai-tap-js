import { createReducer } from "@reduxjs/toolkit";
import { FAIL, REQUEST, SUCCESS, PRODUCT_ACTION, FAVORITE_ACTION } from "../constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
  productDetail: {
    data: {},
    loading: false,
    errors: null,
  },
};

const productReducer = createReducer(initialState, {
  // GET PRODUCT_LIST

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, showMore } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: showMore ? [...state.productList.data, ...data] : data,
        meta,
        loading: false,
      },
    };
  },

  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors,
      },
    };
  },

  // GET PRODUCT_DETAIL

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        loading: false,
      },
    };
  },

  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        errors,
      },
    };
  },

  // CLEAR

  [REQUEST(PRODUCT_ACTION.CLEAR_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.CLEAR_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        data: [],
        meta: {},
        loading: false,
        errors: null,
      },
    };
  },

  [FAIL(PRODUCT_ACTION.CLEAR_PRODUCT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        errors,
      },
    };
  },

  [SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state, 
      productDetail: {
        ...state.productDetail,
        data: {
          ...state.productDetail.data,
          favorites: [...state.productDetail.data.favorites, data]
        },
      },
    };
  },

  [SUCCESS(FAVORITE_ACTION.UN_FAVORITE_PRODUCT)]: (state, action) => {
    const { id } = action.payload;
    const newFavorites = state.productDetail.data.favorites?.filter((item) => item.id !== id)
    return {
      ...state, 
      productDetail: {
        ...state.productDetail,
        data: {
          ...state.productDetail.data,
          favorites: newFavorites
        },
      },
    };
  },
});

export default productReducer;
